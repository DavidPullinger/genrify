export default function () {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    return (
        <div className="h-[50vh] flex items-center">
            <a
                href={backendUrl + '/auth/login'}
                className="flex items-center justify-center gap-x-2 bg-spotify w-fit mx-auto rounded-full p-3 hover:scale-105"
            >
                <img src="./spotify.png" alt="Spotify logo" className="w-6 h-6 ml-2" />
                <p className="text-[#191414] font-medium">Login with Spotify</p>
            </a>
        </div>
    );
}
