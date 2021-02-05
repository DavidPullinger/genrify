import * as SpotifyController from './SpotifyController';

export const getAllTracks = async (id) => {
    let tracks = [];
    let limit = 100;

    await SpotifyController.SpotifyWebApi.getPlaylistTracks(id)
        .then(async res => {
            tracks.push(...res.items.map((item) => {
                return {
                    name: item.track.name,
                    artist: item.track.artists[0].name
                }
            }))
            // if there are more playlists to be fetched
            if (res.total > limit) {
                await Promise.all(makePromises(id, limit, res.total)) 
                    .then(res => {
                        res.forEach((resItem) => {
                            tracks.push(...resItem.items.map((item) => {
                                return {
                                    name: item.track.name,
                                    artist: item.track.artists[0]
                                }
                            }))
                        })
                    })
            }
        })
    return tracks;
}

const makePromises = (id, limit, total) => {
    let promises = [];
    for (let i = 1; i < Math.ceil(total / limit); i++) {
        promises.push(SpotifyController.SpotifyWebApi.getPlaylistTracks(id, { offset: limit * i }))
    }
    return promises;
}

/*export const useAPIData = (initTracks, initErr, isSignedIn) => {
    const [tracks, setTracks] = useState(initTracks);
    const [error, setError] = useState(initErr);

    useEffect(() => {
        window.onunload = () => sessionStorage.removeItem('tracks') // clear users when page is reloaded
        const currentPlaylists = sessionStorage.getItem('tracks');
        // if we have no current users and we are logged in, fetch new users
        if (isSignedIn) {
            SpotifyController.setSpotifyParameters();
            if (!currentPlaylists) {
                getAllPlaylists(50)
                    .then(res => {
                        setPlaylists(res);
                        sessionStorage.setItem('playlists', JSON.stringify(res));
                    })
                    .catch(err => {
                        setError('Error loading playlists. Please check your connection and try again.');
                    })
            }
            else {
                setPlaylists(JSON.parse(currentPlaylists));
            }

        }
    }, [isSignedIn]);
    return [playlists, error];
}*/