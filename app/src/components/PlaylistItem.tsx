import { useRef } from 'react';

export type Playlist = {
    name: string;
    description: string;
    images: { url: string }[];
    tracks: { total: number };
};

export default function PlaylistItem({ playlist }: { playlist: Playlist }) {
    const image = useRef<HTMLImageElement>(null);
    const text = useRef<HTMLImageElement>(null);

    function reveal() {
        const height_str = window
            .getComputedStyle(text.current!)
            .marginTop.replace('px', '')
            .replace('-', '');
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
            onMouseLeave={undo_reveal}
            onMouseEnter={reveal}
            className="max-w-[300px] flex flex-col gap-2 items-center cursor-pointer p-2"
        >
            <img
                ref={image}
                className="rounded z-10 shadow-lg shadow-primary"
                src={playlist.images[0].url}
                alt={playlist.name}
            />
            <div
                ref={text}
                className={`bg-secondary w-full px-4 py-4 rounded-b -mt-10 z-0`}
            >
                <p className="font-[550] mt-0 whitespace-nowrap text-ellipsis overflow-x-hidden">
                    {playlist.name}
                </p>
                <p className="font-light text-sm whitespace-nowrap">{playlist.tracks.total} songs</p>
            </div>
        </div>
    );
}
