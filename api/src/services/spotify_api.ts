import querystring from "querystring";

type tokens = { access_token: string; refresh_token: string };
type content = { content: any; tokens: tokens | null };

export default class SpotifyAPIService {
    refresh_attempts = 0;
    auth_headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
            "Basic " +
            Buffer.from(
                process.env.SPOTIFY_CLIENT_ID +
                    ":" +
                    process.env.SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
    };

    async fetch_access_token(auth_code: string): Promise<tokens> {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: this.auth_headers,
            body: querystring.stringify({
                grant_type: "authorization_code",
                code: auth_code,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            }),
        });
        const response_json = await response.json();

        return {
            access_token: response_json.access_token,
            refresh_token: response_json.refresh_token,
        };
    }

    async refresh_access_token(refresh_token: string): Promise<tokens> {
        this.refresh_attempts++;
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: this.auth_headers,
            body: querystring.stringify({
                grant_type: "refresh_token",
                refresh_token: refresh_token,
            }),
        });
        const response_json = await response.json();

        return {
            refresh_token,
            access_token: response_json.access_token,
        };
    }

    async fetch_content(
        access_token: string,
        refresh_token: string,
        uri: string,
        options: any
    ): Promise<content> {
        console.info(
            "fetching content. refresh attempts: ",
            this.refresh_attempts
        );
        const response = await fetch("https://api.spotify.com/v1/" + uri, {
            headers: {
                Authorization: "Bearer " + access_token,
            },
            body: options ? JSON.stringify(options) : null,
        });
        const response_json = await response.json();

        if (response.status === 401) {
            switch (response_json.error?.message) {
                case "The access token expired":
                    if (this.refresh_attempts === 3) {
                        throw new Error("Unauthorized");
                    }

                    const tokens =
                        await this.refresh_access_token(refresh_token);
                    return this.fetch_content(
                        tokens.access_token,
                        tokens.refresh_token,
                        uri,
                        options
                    );
                default:
                    throw new Error("Unauthorized");
            }
        }

        // return the response from Spotify, but also the tokens if they were refreshed
        return {
            content: response_json,
            tokens:
                this.refresh_attempts > 0
                    ? { access_token, refresh_token }
                    : null,
        };
    }
}
