# Draft Challenge

### Running the app

- Clone the repo.
- `cd` into `/draft-challenge`.
- Run `node server.js` from the root directory.
- Navigate to `http://localhost:8888/`.
- Login with Spotify Credentials.

### Structure
```
entities/
    artist.js
    track.js
scripts/
    fetch.js
    load.js
server.js
index.html
styles.css
```

### Scripts
- `fetch.js` contains all the api calling methods.
- `load.js` handles the authorization and kicks off the page load.

### Entities

- `artist.js` contains the `Artist` class with methods to render Artist and Related Artists.
- `track.js` contains the `Track` class, which handles rendering tracks and playing logic.