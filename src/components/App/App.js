import './App.css';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import * as SpotifyController from '../../controllers/SpotifyController';
import Home from './Home/Home';
import Help from './Help/Help';
import About from './About/About';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem('access_token') !== null);

  return (
    <div className='App'>
      <Router>
        <Navigation isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
        <Switch>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/help'>
            <Help />
          </Route>
          <Route path='/callback'>
            <Callback/>
          </Route>
          <Route path='/'>
            <Home isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function Navigation(props) {
  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    props.setIsSignedIn(false);
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/help">Help</Link>
        </li>
        {props.isSignedIn ?
          <li>
            <a onClick={handleSignOut} href="/">Sign Out</a>
          </li>
          :
          null
        }
      </ul>
    </nav>
  )
}

function Callback(props) {
  useEffect(() => {
    SpotifyController.getHashParams();
    window.opener.location.reload();
    window.close();
  })

  return null;
}

export default App;
