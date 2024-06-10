import express from 'express';
import SpotifyAPIService from '../services/spotify_api';

function fetch_playlists(req: express.Request, res: express.Response) {
    if (!req.session.spotify_access_token || !req.session.spotify_refresh_token) {
        console.info('No Spotify tokens found in session');
        return res.sendStatus(401);
    }

    new SpotifyAPIService()
        .fetch_content(
            req.session.spotify_access_token,
            req.session.spotify_refresh_token,
            'me/playlists',
            null,
            ['fields=items(id,name,description,images,tracks)', 'limit=50']
        )
        .then((data) => {
            if (data.tokens) {
                console.log('updated tokens');
                req.session.spotify_access_token = data.tokens.access_token;
                req.session.spotify_refresh_token = data.tokens.refresh_token;
            }
            res.json(data.content.items);
        })
        .catch((error: Error) => {
            console.error(error);
            res.sendStatus(error.message === 'Unauthorized' ? 401 : 500);
        });
}

function fetch_playlist_tracks(req: express.Request, res: express.Response) {
    if (!req.session.spotify_access_token || !req.session.spotify_refresh_token) {
        console.info('No Spotify tokens found in session');
        return res.sendStatus(401);
    }

    new SpotifyAPIService()
        .fetch_content(
            req.session.spotify_access_token,
            req.session.spotify_refresh_token,
            'playlists/' + req.params.id + '/tracks',
            null,
            ['fields=items.track(id,name,duration_ms,album.images,artists(name,id))','limit=20']
        )
        .then((data) => {
            if (data.tokens) {
                console.log('updated tokens');
                req.session.spotify_access_token = data.tokens.access_token;
                req.session.spotify_refresh_token = data.tokens.refresh_token;
            }
            res.json(data.content.items);
        })
        .catch((error: Error) => {
            console.error(error);
            res.sendStatus(error.message === 'Unauthorized' ? 401 : 500);
        });
}

export default { fetch_playlists, fetch_playlist_tracks };
