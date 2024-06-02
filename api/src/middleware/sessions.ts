import session from 'express-session';
import FileStore from 'session-file-store';

// can declare new properties on the session object
declare module 'express-session' {
    interface SessionData {
        spotify_auth_state: string;
        spotify_access_token: string;
        spotify_refresh_token: string;
    }
}

export default session({
    secret: process.env.SESSION_SECRET!,
    name: 'genrify_session_id',
    store: new (FileStore(session))({ retries: 0 }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    rolling: true,
});
