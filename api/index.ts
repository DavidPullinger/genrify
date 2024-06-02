import express from 'express';
import 'dotenv/config';
import sessions_middleware from './src/middleware/sessions';
import cors_middleware from './src/middleware/cors';
import auth from './src/controllers/spotify_auth';
import content from './src/controllers/spotify_content';

const app = express();
app.use([sessions_middleware, cors_middleware]);

// Routes
app.get('/auth/login', (req, res) => auth.login(req, res));
app.get('/auth/callback', (req, res) => auth.callback(req, res));
app.get('/user/playlists', (req, res) => content.fetch_playlists(req, res));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server has started on port ${process.env.PORT || 3000}...`);
});
