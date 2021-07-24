// styles
import "./App.css";
// modules
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useEffect } from "react";
// ext components/controllers
import * as SpotifyController from "../controllers/SpotifyController";
import Home from "./Home/Home";
// assets
import genrifyLogo from "../assets/genrify-logo.svg";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/callback">
            <Callback />
          </Route>
          <Redirect from="/" to="/home"></Redirect>
        </Switch>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="header-wrapper">
      <img className="genrify-logo" src={genrifyLogo} alt="genrify" />
    </div>
  );
}

function Footer() {
  return (
    <div className="footer-wrapper">
      <p>🎤 v 1.0</p>
      <div>
        <a
          className="slide-left-right"
          href="mailto: davidpullinger003@gmail.com"
        >
          📬 Get in touch
        </a>
      </div>
      <div>
        <a
          className="slide-left-right"
          href="https://github.com/DavidPullinger"
        >
          🛠 Created by David Pullinger
        </a>
      </div>
    </div>
  );
}

function Callback() {
  useEffect(() => {
    SpotifyController.getHashParams();
    window.opener.location.reload();
    window.close();
  });

  return null;
}

export default App;
