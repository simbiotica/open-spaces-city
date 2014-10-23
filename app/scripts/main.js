'use strict';

require.config({

  paths: {
    jquery: '../../bower_components/jquery/dist/jquery',
    underscore: '../../bower_components/underscore/underscore',
    underscoreString: '../../bower_components/underscore.string/lib/underscore.string',
    backbone: '../../bower_components/backbone/backbone',
    Class: '../../bower_components/Class.js/Class',
    text: '../../bower_components/requirejs-text/text'
  },

  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    underscoreString: {
      deps: ['underscore'],
      exports: '_'
    },    
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    Class: {
      exports: 'Class'
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