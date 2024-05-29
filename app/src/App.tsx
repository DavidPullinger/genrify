import { useEffect, useState } from "react";

function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;
  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    fetch(backendUrl + "/user/playlists", {
      credentials: "include",
    })
      .then((res) => setLoggedIn(res.ok))
      .catch(() => setLoggedIn(false));
  }, []);

  return (
    <>
      <div>
        <h1 className="text-4xl">Genrify</h1>
        {loggedIn ? (
          <p>You are logged in</p>
        ) : (
          <a href={backendUrl + "/auth/login"}>Sign In with Spotify</a>
        )}
      </div>
    </>
  );
}

export default App;
