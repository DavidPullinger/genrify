export type Playlist = {
    id: string;
    name: string;
    description: string;
    images: { url: string }[];
    tracks: { total: number; items: { track: Track }[] };
};

export type Track = {
    id: string;
    name: string;
    duration_ms: number;
    artists: { name: string; id: string }[];
    album: { images: { url: string }[] };
};
