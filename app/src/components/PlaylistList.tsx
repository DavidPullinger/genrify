import { useEffect, useState } from 'react';
import PlaylistSummaryItem from './PlaylistSummaryItem';
import fetch from '../utils/fetch';
import { useLogin } from '../providers/LoginProvider';
import { Playlist } from '../types';
import PlaylistDetailedItem from './PlaylistDetailedItem';

export default function PlaylistList() {
    const [playlists, setPlaylists] = useState<Playlist[] | null>(null);
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
    const { setLoggedIn } = useLogin();

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
        selectedPlaylist ? (
            <PlaylistDetailedItem
                playlist={selectedPlaylist}
                setSelectedPlaylist={setSelectedPlaylist} // used to add tracks to playlist
                goBack={() => setSelectedPlaylist(null)}
            />
        ) : (
            <div className="flex flex-col items-center gap-10 sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {playlists.map((playlist) => (
                    <PlaylistSummaryItem
                        key={playlist.name}
                        playlist={playlist}
                        setSelectedPlaylist={setSelectedPlaylist}
                    />
                ))}
            </div>
        )
    ) : (
        <div className="h-[50vh] flex items-center justify-center">
            <p className="text-xl">Loading...</p>
        </div>
    );
}
