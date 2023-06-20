# Scratch Map for Mapbox

This project implements a scratch map using mapbox in the browser.

To view my scratch map, please follow the link: [lewissmallwood.co.uk/scratch-map](https://www.lewissmallwood.co.uk/scratch-map).

### What it looks like
![Example Scratch Map](https://pbs.twimg.com/media/DdBlp4eW4AEcJJq.jpg:large)

## How it works

All the logic for displaying this map is within `map.js`. Country boundaries are defined by the GeoJSON file `countries.json`. You can set which countries you have visited by modifying the array of countries within `visited.json`.

Once the map loads, a HTTP request is made to get the country boundaries, and the your visited countries. The boundaries are then filtered based on your visited countries.

### Deploying your own

Simply add your own API key as explained within the `map.js` comments, and put all the files onto a web server.

## Contributing

You can either raise an issue, and I may or may not end up working on extra features, or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Mapbox is pretty cool.
* [Ash Kyd](https://github.com/AshKyd/geojson-regions) for the countries.json GeoJSON Regions file. 
