import { useEffect } from 'react';
import { Playlist } from '../types';
import TrackItem from './TrackItem';
import fetch from '../utils/fetch';

export default function PlaylistDetailedItem({
    playlist,
    setSelectedPlaylist,
    goBack,
}: {
    playlist: Playlist;
    setSelectedPlaylist: (playlist: Playlist) => void;
    goBack: () => void;
}) {
    useEffect(() => {
        if (playlist.tracks.items) return;

        fetch(`/user/playlists/${playlist.id}/tracks`).then((data) => {
            setSelectedPlaylist({ ...playlist, tracks: { ...playlist.tracks, items: data } });
        });
    }, []);

    return (
        <div className="flex flex-col gap-6 -mt-2">
            <div className="flex items-end gap-2 cursor-pointer hover:text-accent w-fit" onClick={goBack}>
                <BackIcon />
                <p>Back</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-10">
                <div className="flex flex-grow items-center gap-8 w-full">
                    <img
                        className="rounded shadow-lg w-20 sm:w-52 lazyload"
                        data-src={playlist.images[0].url}
                        alt={playlist.name}
                    />
                    <div className="flex flex-col gap-2">
                        <p className="text-2xl sm:text-6xl font-bold">{playlist.name}</p>
                        <p className="ml-1">{playlist.tracks.total} songs</p>
                    </div>
                </div>
                <button className="w-full sm:w-auto border-solid border-2 py-2 px-4 rounded-full hover:scale-105">
                    Genrify
                </button>
            </div>
            {playlist.tracks.items ? (
                <div className="flex flex-col gap-4 mt-2">
                    {playlist.tracks.items.map((track, index) => (
                        <div key={track.track.id} className="flex items-center gap-4">
                            <p className="font-semibold">{index + 1}</p>
                            <TrackItem track={track.track} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="h-[50vh] flex items-center justify-center">
                    <p className="text-xl">Loading...</p>
                </div>
            )}
        </div>
    );
}

function BackIcon() {
    return (
        <svg
            fill="currentColor"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-8 h-8"
        >
            <g>
                <path
                    stroke="currentColor"
                    strokeWidth="5"
                    d="M74.656,56.818c3.895,3.729,5.788,8.795,5.788,15.491c0,1.104,0.896,2,2,2s2-0.885,2-1.989
		c0-7.736-2.362-13.91-7.022-18.369C66.646,43.639,46.325,44.551,30,45.269c-2.28,0.101-4.461,0.211-6.499,0.28L38.428,30.62
		c0.781-0.781,0.781-2.047,0-2.828s-2.048-0.781-2.828,0L17.479,45.915c-0.375,0.375-0.586,0.884-0.586,1.414
		s0.211,1.039,0.586,1.414l18.123,18.12c0.391,0.391,0.902,0.586,1.414,0.586s1.024-0.195,1.415-0.586
		c0.781-0.781,0.781-2.048,0-2.828L24.142,49.75c1.915-0.11,3.932-0.261,6.033-0.354C44.919,48.748,65.114,47.688,74.656,56.818z"
                />
            </g>
        </svg>
    );
}
