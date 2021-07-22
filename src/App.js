import "./App.css";
import spotifyLogo from "./spotify-logo.svg";
import genrifyLogo from "./genrify-logo.svg";

function App() {
  return (
    <div className="App">
      <div className="main-wrapper">
        <div className="header-wrapper">
          <img className="genrify-logo" src={genrifyLogo} alt="genrify" />
        </div>
        <div className="intro">
          <h2>Sort your music, the smart way</h2>
          <div className="spotify-login-btn">
            <p>Login with</p>
            <div className="spotify-logo">
              <img alt="Spotify" src={spotifyLogo} />
            </div>
          </div>
        </div>
        <div className="footer-wrapper">
          <p>🎤 v 1.0</p>
          <a href="mailto: davidpullinger003@gmail.com">📬 Get in touch</a>
          <a href="https://github.com/DavidPullinger">
            🛠 Created by David Pullinger
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
