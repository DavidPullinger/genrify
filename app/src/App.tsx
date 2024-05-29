function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string

  return (
    <>
      <div>
        <h1 className="text-4xl">Genrify</h1>
        <a href={backendUrl + "/login"}>Sign In with Spotify</a>
      </div>
    </>
  )
}

export default App
