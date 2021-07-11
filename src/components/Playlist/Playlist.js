import './Playlist.css';
import { React, useState } from 'react';
import { getAllTracks } from '../../controllers/PlaylistController.js';

function Playlist(props) {
    const [songs, setSongs] = useState([]);

    return (
        <div>
            {props.selected ?
                <div className='playlist'>
                    <div className='imageContainer'>
                        <img onClick={props.onSelect} alt='playlist' src={props.image} />
                    </div>
                    <p>{props.name}</p>
                </div>
                :
                <div className='playlist'>
                    <div className='imageContainer'>
                        <img onClick={props.onSelect} alt='playlist' src={props.image} />
                    </div>
                    <p>{props.name}</p>
                </div>
            }
        </div>
    );
}

const getSongs = (id) => {
    getAllTracks(id)
        .then((res) => console.log(res))
}

export default Playlist;