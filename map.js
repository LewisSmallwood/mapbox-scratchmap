mapboxgl.accessToken = "pk.eyJ1IjoibGV3aXNzbWFsbHdvb2QiLCJhIjoiY2pwY3hiNmc1MzF2eDN3cGhjbXA0M2g3ZSJ9.GoUGg6UcUV-fvYV2IXVoOw";

// Define a map centered on Europe.
const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/dark-v9', // stylesheet location
    center: [20, 52.4862], // starting position [lng, lat]
    zoom: 3 // starting zoom
});

/**
 * Load the map.
 */
map.on('load', function () {
    // Lookup the order of text layers so we place the selected country layers behind the text.
    let layers = map.getStyle().layers;
    let firstSymbolId;
    for (let i = 0; i < layers.length; i++) {
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

/**
 * Construct the search filter.
 * @param arr
 * @returns {string[]}
 */
function buildFilter(arr) {
    let filter = ['in', 'name_long'];
    if (arr.length === 0) return filter;

    for (let i = 0; i < arr.length; i += 1) filter.push(arr[i]);
    return filter;
}

/**
 * Perform a HTTP GET request.
 * @param requestURL
 * @param callback
 */
function httpGETRequest(requestURL, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) callback(xmlHttp.responseText);
    }

    xmlHttp.open("GET", requestURL, true);
    xmlHttp.send(null);
}
