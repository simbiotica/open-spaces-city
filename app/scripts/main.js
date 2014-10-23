'use strict';

require.config({

  paths: {
    jquery: '../../bower_components/jquery/dist/jquery',
    underscore: '../../bower_components/underscore/underscore',
    backbone: '../../bower_components/backbone/backbone'
  },

  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  }

});


require([
  'jquery',
  'backbone',
  'router',
  'views/mapView'
], function($, Backbone, Router, MapView) {

  new MapView();


  window.router = new Router();

  Backbone.history.start();

});