import express from "express";
const router = express.Router();

router.get("/user/playlists", (req, res) => {
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

export default router;
