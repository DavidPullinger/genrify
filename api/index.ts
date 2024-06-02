import express from 'express';
import 'dotenv/config';

import spotify_content from './src/controllers/spotify_content';
import spotify_auth from './src/controllers/spotify_auth';
import sessions_middleware from './src/middleware/sessions';
import cors_middleware from './src/middleware/cors';

const app = express();
app.use(sessions_middleware).use(cors_middleware).use(spotify_auth).use(spotify_content);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server has started...');
});
