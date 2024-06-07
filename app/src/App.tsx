import { useState } from 'react';
import PlaylistList from './components/PlaylistList';
import { LoginContext } from './providers/LoginProvider';
import SpotifyLogin from './components/SpotifyLogin';
import ErrorMessage from './components/ErrorMessage';

function App() {
    const [loggedIn, setLoggedIn] = useState<boolean | null>(true);

    return (
        <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
            <div className="flex flex-col gap-4">
                <nav className="flex justify-between items-center mb-2">
                    <h1 className="font-semibold text-5xl">Genrify</h1>
                </nav>

                {loggedIn ? (
                    <PlaylistList />
                ) : loggedIn !== null ? (
                    <SpotifyLogin />
                ) : (
                    <ErrorMessage error="An error occurred. Please try again later." />
                )}
            </div>
        </LoginContext.Provider>
    );
}

export default App;
