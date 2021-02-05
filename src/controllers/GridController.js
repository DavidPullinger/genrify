import { useEffect, useState } from 'react';
import * as SpotifyController from './SpotifyController';
import defaultPlaylist from '../assets/defaultPlaylist.png';

const getAllPlaylists = async (limit) => {
    let playlists = [];
    await SpotifyController.SpotifyWebApi.getUserPlaylists({ limit: limit })
        .then(async res => {
            playlists.push(...res.items.map((item) => {
                return {
                    name: item.name,
                    image: item.images[0] ? item.images[0].url : defaultPlaylist,
                    id: item.id
                }
            }))
            // if there are more playlists to be fetched
            if (res.total > limit) {
                await Promise.all(makePromises(limit, res.total))
                    .then(res => {
                        res.forEach((resItem) => {
                            playlists.push(...resItem.items.map((item) => {
                                return {
                                    name: item.name,
                                    image: item.images[0] ? item.images[0].url : defaultPlaylist,
                                    id: item.id
                                }
                            }))
                        })
                    })
            }
        })
    return playlists;
}

const makePromises = (limit, total) => {
    let promises = [];
    for (let i = 1; i < Math.ceil(total / limit); i++) {
        promises.push(SpotifyController.SpotifyWebApi.getUserPlaylists({ offset: limit * i, limit: limit }))
    }
    return promises;
}

export const useAPIData = (initPlaylists, initErr, isSignedIn) => {
    const [playlists, setPlaylists] = useState(initPlaylists);
    const [error, setError] = useState(initErr);

    useEffect(() => {
        window.onunload = () => sessionStorage.removeItem('playlists') // clear users when page is reloaded
        const currentPlaylists = sessionStorage.getItem('playlists');
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
}