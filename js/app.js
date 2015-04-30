/*globals L */

$(function(){
  var tileURL = 'http://matth-tiles.herokuapp.com/features/tile.json';
  var baseLayer = L.tileLayer('http://a.tiles.mapbox.com/v3/matth.map-pzt2g69t/{z}/{x}/{y}.png');
  var pencil = L.tileLayer('http://a.tiles.mapbox.com/v3/matth.m2aepop1/{z}/{x}/{y}.png');
  var sat = L.tileLayer('http://a.tiles.mapbox.com/v3/matth.m2afagi8/{z}/{x}/{y}.png');
  var dark = L.tileLayer('http://a.tiles.mapbox.com/v3/matth.m2af8hjl/{z}/{x}/{y}.png');

  var template = _.template($('#styles').html());
  var templateDashed = _.template($('#styles-dashed').html());

  var options = {
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: false
  };

  var mapDetroit = L.map('mapDetroit', options).setView([42.34435,-83.056898 ], 12); // detroit
  var mapSF = L.map('mapSF', options).setView([37.775773,-122.422693 ], 18); // sf
  var mapChicago = L.map('mapChicago', options).setView([41.790656,-87.599657], 16); // chicago
  var mapBrooklyn = L.map('mapBrooklyn', options).setView([40.686764,-73.991032], 16); // brooklyn

  mapDetroit.addLayer(baseLayer);
  mapSF.addLayer(pencil);
  mapChicago.addLayer(dark);
  mapBrooklyn.addLayer(sat);

  function addParcelLayer(map, layer) {
    var popup = L.popup();

    $.ajax({
      url: tileURL,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(layer)
    }).done(function(data) {
      var featureLayer = L.tileLayer(data.tiles[0]);
      map.addLayer(featureLayer);

      if (map.getZoom() < 14) {
        return;
      }

      var utfGrid = new L.UtfGrid(data.grids[0]);
      utfGrid.on('click', function (e) {
        console.log(e);
        popup
            .setLatLng(e.latlng)
            .setContent(e.data.long_name)
            .openOn(map);
      });
      map.addLayer(utfGrid);
    });
  }

  var detroit = {
    query: {
      type: 'parcels'
    },
    select: {},
    styles: template({s: {
      color: '#6e6663',
      fillColor: '#6e6663',
      pointSize: 18
    }})
  };

  var sf = {
    query: {
      type: 'parcels'
    },
    select: {},
    styles: template({s: {
      color: '#ff3d98',
      fillColor: 'transparent',
      pointSize: 18
    }})
  };

  var chicago = {
    query: {
      type: 'buildings'
    },
    select: {},
    styles: template({s: {
      color: '#fff',
      fillColor: 'transparent'
    }})
  };

    var brooklyn = {
    query: {
      type: 'parcels'
    },
    select: {},
    styles: template({s: {
      color: '#ffff0c',
      fillColor: 'transparent'
    }})
  };

  addParcelLayer(mapDetroit, detroit);
  addParcelLayer(mapSF, sf);
  addParcelLayer(mapChicago, chicago);
  addParcelLayer(mapBrooklyn, brooklyn);


});
