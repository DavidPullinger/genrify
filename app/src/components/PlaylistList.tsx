import { useContext, useEffect, useState } from 'react';
import PlaylistItem, { Playlist } from './PlaylistItem';
import fetch from '../utils/fetch';
import { LoginContext } from '../providers/LoginProvider';

export default function PlaylistList() {
    const [playlists, setPlaylists] = useState<Playlist[] | null>(null);
    const { setLoggedIn } = useContext(LoginContext);

    useEffect(() => {
        fetch('/user/playlists')
            .then((data: Playlist[]) => {
                if (!data) {
                    setLoggedIn(false);
                    return;
                }
                setPlaylists(data);
            })
            .catch((_) => {
                setLoggedIn(null);
            });
    }, []);

    return playlists ? (
        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {playlists.map((playlist) => (
                <PlaylistItem key={playlist.name} playlist={playlist} />
            ))}
        </div>
    ) : (
        <div className="h-[50vh] flex items-center justify-center">
            <p className='text-xl'>Loading...</p>
        </div>
    );
}
