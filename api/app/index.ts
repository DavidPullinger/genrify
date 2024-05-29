import querystring from "querystring";
import express from "express";
import session from "express-session";
import cors from "cors";
import FileStore from "session-file-store";
import "dotenv/config";
import { generateRandomString } from "./utils";

declare module "express-session" {
    interface SessionData {
        spotify_auth_state: string;
        spotify_auth_token: string;
        spotify_refresh_token: string;
    }
}

const app = express();
app.use(
    session({
        secret: "afasfas",
        name: "genrify_session_id",
        store: new (FileStore(session))(),
        resave: false,
        saveUninitialized: false,
    })
).use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.get("/user/playlists", (req, res) => {
    if (!req.session.spotify_auth_token) {
        return res.sendStatus(401);
    }

    fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
            Authorization: "Bearer " + req.session.spotify_auth_token,
        },
    })
        .then((response) => response.json())
        .then((data) => res.json(data));
});

app.get("/auth/login", (req, res) => {
    let scopes = [
        "user-library-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-private",
    ];
    let state = generateRandomString(16);

    req.session.spotify_auth_state = state;
    res.redirect(
        "https://accounts.spotify.com/authorize?" +
            querystring.stringify({
                response_type: "code",
                client_id: process.env.SPOTIFY_CLIENT_ID,
                scope: scopes.join(" "),
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                state: state,
                show_dialog: true,
            })
    );
});

app.get("/auth/callback", (req, res) => {
    // do some sanity checks
    if (req.query.error) {
        req.session.spotify_auth_state = "";
        return res.send("Callback error: " + req.query.error);
    }
    if (
        !req.query.state ||
        req.query.state !== req.session.spotify_auth_state
    ) {
        req.session.spotify_auth_state = "";
        return res.send("State mismatch");
    }
    req.session.spotify_auth_state = "";

    // exchange code for token
    fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
                "Basic " +
                Buffer.from(
                    process.env.SPOTIFY_CLIENT_ID +
                        ":" +
                        process.env.SPOTIFY_CLIENT_SECRET
                ).toString("base64"),
        },
        body: querystring.stringify({
            grant_type: "authorization_code",
            code: req.query.code as string,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            req.session.spotify_auth_token = data.access_token;
            req.session.spotify_refresh_token = data.refresh_token;
            res.redirect("http://localhost:5173");
        });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
