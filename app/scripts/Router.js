define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      '': 'welcome',
      '*any': 'notFound'
    },

    pages: {
      welcome: $('#welcomePage'),
      notFound: $('#notFoundPage')
    },

    initialize: function() {
      this.setListeners();
    },

    setListeners: function() {
      this.on('route', function(routeName, params) {
        if (routeName === 'questions' && this.validateTable(params[0])) {
          Backbone.Events.trigger('Router:' + routeName, params);
        } else if (this.validateTable(params[0]) || params[1]) {
          Backbone.Events.trigger('Router:' + routeName, params);
        }
      });

      Backbone.Events.on('data:error', function() {
        this.activePage('error');
      }, this);
    },

    welcome: function() {
      this.activePage('welcome');
    },

    error: function() {
      this.activePage('error');
    },

    notFound: function() {
      this.activePage('notFound');
    },

    validateTable: function(table) {
      return !!(table && _.isFinite(Number(table)));
    },

    activePage: function(currentPage) {
      _.each(this.pages, function(page) {
        page.removeClass('is-active');
      });

      $('#overlayView').addClass('is-hidden');
      Backbone.Events.trigger('setCurrent', currentPage);

      this.pages[currentPage].addClass('is-active');
    }

  });

  return Router;

});