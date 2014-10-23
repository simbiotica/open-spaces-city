'use strict';

require.config({

  paths: {
    jquery: '../../bower_components/jquery/dist/jquery',
    underscore: '../../bower_components/underscore/underscore',
    backbone: '../../bower_components/backbone/backbone',
    handlebars: '../../bower_components/handlebars/handlebars',
    text: '../../bower_components/requirejs-text/text',
    underscoreString: '../../bower_components/underscore.string/lib/underscore.string',
    spin: '../../bower_components/spinjs/spin'
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
    },
    underscoreString: {
      deps: ['underscore'],
      exports: '_'
    },
    spin: {
      exports: 'Spinner'
    }
  }

});


require([
  'jquery',
  'backbone',
  'Router'
], function($, Backbone, Router) {

  window.router = new Router();

  Backbone.history.start();

});