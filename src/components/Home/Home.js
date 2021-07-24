// style
import "./Home.css";
// assets
import spotifyLogo from "../../assets/spotify-logo.svg";

// centered pop up window
function popupWindow(url, windowName, win, w, h) {
  const y = win.top.outerHeight / 2 + win.top.screenY - h / 2;
  const x = win.top.outerWidth / 2 + win.top.screenX - w / 2;
  return win.open(
    url,
    windowName,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`
  );
}

function Home() {
  const isSignedIn = localStorage.getItem("access_token") !== null;
  return <div id="home">{isSignedIn ? <AfterSignIn /> : <BeforeSignIn />}</div>;
}

function BeforeSignIn() {
  return (
    <div className="intro">
      <h2>Sort your music, the smart way</h2>
      <button
        onClick={() =>
          popupWindow("http://localhost:3000/login", "", window, 500, 700)
        }
        className="spotify-login-btn"
      >
        <p>Login with</p>
        <div className="spotify-logo">
          <img alt="Spotify" src={spotifyLogo} />
        </div>
      </button>
    </div>
  );
}

function AfterSignIn() {
  return (
    <div>
      <p>SIGNED IN ✍🏽</p>
    </div>
  );
}

export default Home;
