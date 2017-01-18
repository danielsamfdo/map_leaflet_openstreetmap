# MAP LEAFLET 

There are instructions for exporting data from Open Street Map in this Wiki link : http://wiki.openstreetmap.org/wiki/Downloading_data

1) Create an Open Street Map Account.

2) Choose the Export Option example url  : https://www.openstreetmap.org/export#map=15/42.3901/-72.5210 and export it

3) Once exported into an osm format, you need to convert it to a geojson file as leaflet accepts only geojson files.
https://help.openstreetmap.org/questions/18255/softwarelibraries-to-convert-osm-data-to-geojson-without-using-api

```
osmtogeojson in.osm > out.json
```

4) Once done follow the instructions given in the link http://leafletjs.com/examples/geojson/

To run the repo and see the example present in pages/map.html

```
git clone https://github.com/danielsamfdo/map_leaflet_openstreetmap
cd map_leaflet_openstreetmap
python -m SimpleHTTPServer 8000
```

The simple http server is required for jQuery to load the json file



This uses sb admin template from Start Bootstrap : https://startbootstrap.com/template-overviews/sb-admin-2/
