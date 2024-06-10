import { Track } from '../types';

export default function TrackItem({ track }: { track: Track }) {
    function minutes_seconds(ms: number) {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
    }

    return (
        <div className="flex justify-between items-center flex-grow">
            <div className="flex items-center gap-4">
                <img
                    data-src={track.album.images[1].url}
                    alt={track.name}
                    className="w-12 sm:w-16 rounded-md lazyload"
                />
                <div>
                    <p className="font-semibold">{track.name}</p>
                    <p className="text-sm">{track.artists.map((artist) => artist.name).join(', ')}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <p>{minutes_seconds(track.duration_ms)}</p>
                <p>☑️</p>
            </div>
        </div>
    );
}
