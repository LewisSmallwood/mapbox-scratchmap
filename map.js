// You can add your public mapbox access token here using:
// mapboxgl.accessToken = 'YOUR_ACCESS_TOKEN_HERE'
//
// To obtain an access token from Mapbox, visit:
// https://www.mapbox.com/account/access-tokens
//
// For the example, the function getAccessToken() is used.
mapboxgl.accessToken = getAccessToken();

// Define a map centered on Europe.
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
    center: [20, 52.4862], // starting position [lng, lat]
    zoom: 3 // starting zoom
});

// In order for the example to function without a hardcoded access token in the repository, your access token is
// requested using a prompt and then stored in LocalStorage for returning sessions. This function will get your saved
// access token from LocalStorage or prompt for it when it has not been inputted.
function getAccessToken() {
    // Check to see if token is within the Local Storage.
    var isTokenFound = false;
    var accessToken;

    if (typeof(Storage) !== "undefined") {
        accessToken = localStorage.getItem("accessToken");
        if ((accessToken != null) && (accessToken != "null")) {
            isTokenFound = true;
        }
    }

    if (!isTokenFound) {
        // Ask for the access token.
        accessToken = prompt("Please enter your mapbox access token.");
        while (accessToken == null) {
            accessToken = prompt("Please enter your mapbox access token.");
        }

        // Store it within local storage.
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("accessToken", accessToken);
        }
    }

    return accessToken;
}