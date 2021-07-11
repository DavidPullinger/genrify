import './Home.css';
import Playlist from '../Playlist/Playlist.js';
import { useAPIData } from '../../controllers/GridController.js';
import { React, useState } from 'react';

// centered pop up window
const popupWindow = (url, windowName, win, w, h) => {
    const y = win.top.outerHeight / 2 + win.top.screenY - (h / 2);
    const x = win.top.outerWidth / 2 + win.top.screenX - (w / 2);
    return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
}

function Home(props) {
    const [selected, setSelected] = useState(null);

    return (
        <div className='homeContainer'>
            {props.isSignedIn ?
                (selected === null) ?
                    <PlaylistGrid setSelected={setSelected} isSignedIn={props.isSignedIn} />
                    :
                    <SelectedPlaylist selected={selected} setSelected={setSelected} />
                :
                <button onClick={() => popupWindow('http://localhost:3000/login', '', window, 500, 700)}>Sign In</button>
            }
        </div>
    );
}

function PlaylistGrid(props) {
    // fetch playlists from SpotifyAPI
    const [playlists, error] = useAPIData([], '', props.isSignedIn);

    return (
        <div>
            <div className='playlistHeading'>
                <h1>Your Playlists</h1>
                <h3>Select a playlist to Genrify</h3>
            </div>
            <p className='errorContainer'>
                {error}
            </p>
            <div>
                {!playlists || playlists.length === 0 ?
                    <div>
                        <h2 style={{ 'margin': 'auto' }}>Loading...</h2>
                    </div>
                    :
                    <div className='grid'>
                        {playlists.map(playlist => <Playlist key={playlist.name} onSelect={() => props.setSelected(playlist)} id={playlist.id} name={playlist.name} image={playlist.image} />)}
                    </div>
                }
            </div>
        </div>
    );
}

function SelectedPlaylist(props) {
    const { selected, setSelected } = props;
    return (
        <div>
            <p onClick={() => setSelected(null)}>Back</p>
            <Playlist id={selected.id} name={selected.name} image={selected.image} />
        </div>
    );
}


export default Home;