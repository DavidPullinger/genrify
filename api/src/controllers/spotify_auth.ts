import querystring from 'querystring';
import express from 'express';
import { generateRandomString } from '../utils';
import SpotifyAPIService from '../services/spotify_api';
const router = express.Router();

router.get('/auth/login', (req, res) => {
    let scopes = [
        'user-library-read',
        'playlist-read-private',
        'playlist-read-collaborative',
        'playlist-modify-private',
    ];
    let state = generateRandomString(16);

    req.session.spotify_auth_state = state;
    res.redirect(
        'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.SPOTIFY_CLIENT_ID,
                scope: scopes.join(' '),
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                state: state,
                show_dialog: true,
            }),
    );
});

router.get('/auth/callback', (req, res) => {
    // do some sanity checks
    if (req.query.error || !req.query.state || req.query.state !== req.session.spotify_auth_state) {
        req.session.spotify_auth_state = '';
        return res.send('Error. Invalid state or error from Spotify');
    }
    req.session.spotify_auth_state = '';

    new SpotifyAPIService().fetch_access_token(req.query.code as string).then((data) => {
        req.session.spotify_access_token = data.access_token;
        req.session.spotify_refresh_token = data.refresh_token;
        res.redirect('http://localhost:5173');
    });
});

export default router;
