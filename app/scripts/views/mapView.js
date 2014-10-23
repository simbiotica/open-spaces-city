define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone) {

  'use strict';

  var tileUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';  

  var MapView = Backbone.View.extend({

    el: '#mapView',

    /**
     * Leaflet map default options.
     * @type {Object}
     */
    options: {
      tile: tileUrl,
      map: {
        center: [40.7056308,-73.9780035],
        zoom: 12,
        minZoom: 1,
        maxZoom: 14,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom :false
      }
    },

    initialize: function() {
      this._render();
      // this.locations = locationsService;
      // this.cartodbLayer = new CartoDBLayer();
      // this._render();
      // this._initMarkerLayers();
      // this._setEvents();
    },

    /**
     * Render leaflet map.
     */
    _render: function() {
      this.map = L.map(this.el, this.options.map);
      L.tileLayer(this.options.tile).addTo(this.map);
    },

    // _setEvents: function() {
    //   Backbone.Events.on('controls:zoomIn', this._zoomIn, this);
    //   Backbone.Events.on('controls:zoomOut', this._zoomOut, this);
    //   Backbone.Events.on('presenter:change', this._setCartoDBLayer, this);
    //   Backbone.Events.on('locationsService:change', this._setMarkerLayers, this);
    // },

    // /**
    //  * Initialize MakerLayers. Doesn't create the layer,
    //  * just initialize the views.
    //  */
    // _initMarkerLayers: function() {
    //   this.regionsMarkersLayer = new MarkersLayer({
    //     valueSize: true,
    //     className: 'mod-marker-region'
    //   }, this.map);

    //   this.countriesMarkersLayer = new MarkersLayer({
    //     valueSize: true,
    //     className: 'mod-marker-country'
    //   }, this.map);

    //   this.projectsMarkersLayer = new MarkersLayer({
    //     markerClickable: false
    //   }, this.map);
    // },

    // /**
    //  * Update MakerLayers with the current location.
    //  */
    // _setMarkerLayers: function() {
    //   var data = this.locations.getData(), layer;

    //   this.countriesMarkersLayer.setLayer(data.countries);
    //   this.regionsMarkersLayer.setLayer(data.regions);
    //   this.projectsMarkersLayer.setLayer(data.projects);

    //   layer = this.projectsMarkersLayer.layer || this.countriesMarkersLayer.layer || this.regionsMarkersLayer.layer;

    //   setTimeout(_.bind(function() {
    //     layer && this._fitBounds(layer.getBounds());
    //   }, this), 300);
    // },

    // /**
    //  * Set CartoDBLayer with the layers on the presenter.
    //  *
    //  * @param {Object} params Presenter params
    //  */
    // _setCartoDBLayer: function(params) {
    //   this.cartodbLayer.removeInfowindow();
    //   if (params.layer) {
    //     if (params.layer === 'none') {
    //       this.cartodbLayer.removeLayer();
    //       this.cartodbLayer.removeLegend();
    //     } else {
    //       this.cartodbLayer.setLayer(this.map, params);
    //     }
    //   }
    // },

    // _fitBounds: function(bounds) {
    //   this.map.fitBounds(bounds);
    // },

    // _zoomIn: function() {
    //   this.map.zoomIn();
    // },

    // _zoomOut: function() {
    //   this.map.zoomOut();
    // }

  });

  return MapView;

});
