import { stringify } from "querystring";
import express from "express";
import session from "express-session";
import "dotenv/config";
import { generateRandomString } from "./utils";

declare module "express-session" {
    interface SessionData {
        spotify_auth_state: string;
        visited: boolean;
    }
}

const app = express();
app.use(
    session({
        secret: "afasfas",
        cookie: { maxAge: 60000 },
        name: "genrify_session_id",
    })
);


app.get("/login", (req, res) => {
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
            stringify({
                response_type: "code",
                client_id: process.env.SPOTIFY_CLIENT_ID,
                scope: scopes.join(" "),
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                state: state,
                show_dialog: true,
            })
    );
});

app.get("/callback", (req, res) => {
    // do some sanity checks
    if (req.query.error) {
        return res.send("Callback error: " + req.query.error);
    }
    if (req.query.state !== req.session.spotify_auth_state) {
        return res.send("State mismatch");
    }

    // TODO: exchange code for token
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
