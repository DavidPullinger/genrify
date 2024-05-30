import { useEffect, useState } from "react";

function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;
  const [loggedIn, setLoggedIn] = useState<boolean | null>(true);
  const [playlists, setPlaylists] = useState<any[] | null>(null);

  useEffect(() => {
    fetch(backendUrl + "/user/playlists", {
      credentials: "include",
    })
      .then((res) => {
        setLoggedIn(res.ok);
        return res.ok && res.json();
      })
      .then((data) => data && setPlaylists(data.items))
      .catch(() => setLoggedIn(null));
  }, []);

  let welcome_msg;
  if (loggedIn === null) {
    welcome_msg = <p>Oops, please try refreshing the page</p>;
  } else if (loggedIn) {
    welcome_msg = (
      <div className="h-[50vh] overflow-y-auto">
        {!playlists && <p>Loading...</p>}
        {playlists?.map((playlist) => (
          <div className="flex flex-row items-center justify-between space-y-4">
            <p key={playlist.id}>{playlist.name}</p>
            <img
              width="100px"
              src={playlist.images[0].url}
              alt={playlist.name}
            />
          </div>
        ))}
      </div>
    );
  } else {
    welcome_msg = <a href={`${backendUrl}/auth/login`}>Sign In with Spotify</a>;
  }

  return (
    <>
      <div>
        <h1 className="text-4xl">Genrify</h1>
        {welcome_msg}
      </div>
    </>
  );
}

export default App;
