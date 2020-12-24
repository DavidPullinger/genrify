import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home(props) {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        let mounted = true;
        axios.get('https://jsonplaceholder.typicode.com/users/')
            .then(res => {
                if (mounted)
                    setUsers(res.data)
            })
            .catch(err => {
                setError('Error loading playlists. Please check your connection and try again.')
            });
        return () => mounted = false
    }, [])

    const handleSignIn = () => {
        localStorage.setItem('login', 'true');
        props.setIsSignedIn(true);
    };

    return (
        <div className='homeContainer'>
            <h1>Home Page</h1>
            {props.isSignedIn ?
                <div>
                    <h2 className='playlistHeading'>Your Playlists</h2>
                    <p className='errorContainer'>
                        {error}
                    </p>
                    <ul className='playlistContainer'>
                        {users.length === 0 ?
                            <li>Loading</li>
                            :
                            users.map(user => <li key={user.name}>{user.name}</li>)
                        }
                    </ul>
                </div>
                :
                <button onClick={handleSignIn}>Sign In</button>
            }
        </div>
    );
}

export default Home;