/*globals L, cartodb: true */

$(function(){
  var map = L.map('map').setView([42.42, -83.02 ], 13);

  var baseLayer = L.tileLayer('http://a.tiles.mapbox.com/v3/matth.map-zmpggdzn/{z}/{x}/{y}.png');
  map.addLayer(baseLayer);

});
