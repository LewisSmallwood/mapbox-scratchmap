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
    style: 'mapbox://styles/mapbox/dark-v9', // stylesheet location
    center: [20, 52.4862], // starting position [lng, lat]
    zoom: 3 // starting zoom
});

map.on('load', function () {

    // Lookup the order of text layers so we place the selected country layers behind the text.
    var layers = map.getStyle().layers;
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }

    // Define a GeoJSON source of all countries and their boundaries.
    map.addSource('countries', {
        "type": "geojson",
        "data": './countries.json'
    });

    // Get the countries I have visited and add them to a new map layer.
    httpGETRequest("./visited.json", function(countries) {

        countries = JSON.parse(countries);

        map.addLayer({
            'id': 'country',
            'type': 'fill',
            'source': 'countries',
            'layout': {
            },
            'paint': {
                'fill-opacity': 0.8,
                'fill-color': 'rgba(200, 100, 240, 0.4)',
                'fill-outline-color': 'rgba(200, 100, 240, 1)'
            },
            "filter": buildFilter(countries["visited"])
        }, firstSymbolId);

    });
});

// Construct the search filter.
function buildFilter(arr) {
    var filter = ['in', 'name_long'];

    if (arr.length === 0) {
        return filter;
    }

    for(var i = 0; i < arr.length; i += 1) {
        filter.push(arr[i]);
    }

    return filter;
}

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

function httpGETRequest(requestURL, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", requestURL, true); // true for asynchronous
    xmlHttp.send(null);
}