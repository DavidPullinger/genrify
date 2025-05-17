import { useRef } from 'react';
import { Playlist } from '../types';

export default function PlaylistSummaryItem({
    playlist,
    setSelectedPlaylist,
}: {
    playlist: Playlist;
    setSelectedPlaylist: (playlist: Playlist) => void;
}) {
    const image = useRef<HTMLImageElement>(null);
    const text = useRef<HTMLImageElement>(null);
    function reveal() {
        const height_str = window.getComputedStyle(text.current!).marginTop.replace('px', '').replace('-', '');
        const height = parseInt(height_str) / 2;
        image.current!.style.transform = `translateY(-${height}px)`;
        text.current!.style.transform = `translateY(${height}px)`;
    }
    function undo_reveal() {
        image.current!.style.transform = 'translateY(0)';
        text.current!.style.transform = 'translateY(0)';
    }

    return (
        <div
            onClick={() => {
                setSelectedPlaylist(playlist);
                // we do this to keep state throughout our app
                history.pushState(null, '', '/playlist/' + playlist.id);
            }}
            onMouseLeave={undo_reveal}
            onMouseEnter={reveal}
            className="max-w-[300px] flex flex-col gap-2 items-center cursor-pointer"
        >
            <img
                ref={image}
                className="rounded z-10 shadow-lg shadow-primary lazyload"
                data-src={playlist.images[0].url}
                alt={playlist.name}
            />
            <div ref={text} className={`bg-secondary w-full px-4 py-4 rounded-b -mt-10 z-0`}>
                <p className="font-[550] mt-0 whitespace-nowrap text-ellipsis overflow-x-hidden">{playlist.name}</p>
                <p className="font-light text-sm whitespace-nowrap">{playlist.tracks.total} songs</p>
            </div>
        </div>
    );
}
