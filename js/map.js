jQuery(document).ready(function(){
  //var mymap = L.map('mapid').setView([42.39, -72.529], 24);
  var mymap = L.map('mapid', {drawControl: true}).setView([-104.98404, 39.74621], 24);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'danielsamfdo.2l6kbdep',
    accessToken: 'pk.eyJ1IjoiZGFuaWVsc2FtZmRvIiwiYSI6ImNpeHhsazYxZjAwMngycXJ5MDRqeWIzamIifQ.t2OpMyWV4CwTfoc1ZjInMA'
  }).addTo(mymap);



  var marker = L.marker([42.39, -72.529]).addTo(mymap);
  // var circle = L.circle([42.39,  -72.529], {
  //   color: 'red',
  //   fillColor: '#f03',
  //   fillOpacity: 0.5,
  //   radius: 5
  // }).addTo(mymap);
  // var polygon = L.polygon([
  //   [42.38999, -72.52866],
  //   [42.39011, -72.52793],
  //   [42.38934, -72.52766],
  //   [42.38912, -72.52828],

  // ]).addTo(mymap);
  marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
  // circle.bindPopup("I am a circle.");
  // polygon.bindPopup("I am a polygon.");
  var popup = L.popup();
  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(mymap);
  }

  //mymap.on('click', onMapClick);
  var states = [{
    "type": "Feature",
    "properties": {"party": "Republican"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-104.05, 48.99],
            [-97.22,  48.98],
            [-96.58,  45.94],
            [-104.03, 45.94],
            [-104.05, 48.99]
        ]]
    }
  }, {
      "type": "Feature",
      "properties": {"party": "Democrat"},
      "geometry": {
          "type": "Polygon",
          "coordinates": [[
              [-109.05, 41.00],
              [-102.06, 40.99],
              [-102.03, 36.99],
              [-109.04, 36.99],
              [-109.05, 41.00]
          ]]
      }
  }];

  // L.geoJSON(states, {
  //     style: function(feature) {
  //         switch (feature.properties.party) {
  //             case 'Republican': return {color: "#ff0000"};
  //             case 'Democrat':   return {color: "#0000ff"};
  //         }
  //     }
  // }).addTo(mymap);

  function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
  }

  var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };

  var geojsonFeature = {
      "type": "Feature",
      "properties": {
          "name": "Coors Field",
          "amenity": "Baseball Stadium",
          "popupContent": "This is where the Rockies play!"
      },
      "geometry": {
          "type": "Point",
          "coordinates": [-104.99404, 39.75621]
      }
  };

  L.geoJSON(geojsonFeature, {
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  }).addTo(mymap);

  var someFeatures = [{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "show_on_map": false
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
  }, {
      "type": "Feature",
      "properties": {
          "name": "Busch Field",
          "show_on_map": true
      },
      "geometry": {
          "type": "Point",
          "coordinates": [-104.98404, 39.74621]
      }
  }];

  function onEachBuilding(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.name) {
        layer.bindPopup(feature.properties.name);
    }
  }


  L.geoJSON(someFeatures, {
      filter: function(feature, layer) {
          return feature.properties.show_on_map;
      }
  }).addTo(mymap);

  $.getJSON('../test.json', function(data) {
    L.geoJSON(data, {
    onEachFeature: onEachBuilding,
    filter: function(feature, layer) {
          return feature.properties.building == "university" || (feature.properties.building == "yes" && feature.properties.name);
      }
  }).addTo(mymap);
  });

  
  var drawnItems = new L.FeatureGroup();
  mymap.addLayer(drawnItems);
  var drawControl = L.Control.Draw({
    edit: {
      featureGroup: drawnItems
    }
  });
  mymap.addControl(drawControl);
});