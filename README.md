# Genrify

## Description

Genrify is a web app that allows Spotify users to sign in to their Spotify Account and organize their music into playlists based on genre. I decided to create this because Spotify does not have a decent way of viewing or playing your saved music by genre, whereas other music services, such as Apple Music, do.

## Technical Design

Nothing complicated is happening underneath the hood. Genrify loops through a user selected playlist and finds the genre of each song using the Deezer API (this is a temporary method of finding the genre). If the song cannot be placed into a genre, the user will be given the opportunity to manually assign the song to a genre. Once all songs have been assigned to a genre, playlists referring to the relevant genres are created.
