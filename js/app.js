/*globals L */

$(function(){
  var tileURL = 'http://matth-tiles.herokuapp.com/features/tile.json';
  var baseLayer = L.tileLayer('http://a.tiles.mapbox.com/v3/matth.map-pzt2g69t/{z}/{x}/{y}.png');
  var sat = L.tileLayer('http://a.tiles.mapbox.com/v3/matth.m2afagi8/{z}/{x}/{y}.png');

  var options = {
    // zoomControl: false,
    // attributionControl: false,
    // scrollWheelZoom: false
  };

  var mapDetroit = L.map('map', options).setView([42.34435,-83.056898 ], 12); // detroit
  mapDetroit.addLayer(baseLayer);
});
