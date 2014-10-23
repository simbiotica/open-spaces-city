'use strict';
define([
  'jquery',
  'underscore',
  'underscoreString',
  'backbone',
  'Class',
  //cartocss
  'text!cartocss/parks-polygons.cartocss',
  'text!cartocss/twitts.cartocss',
  // queries
  'text!queries/parks-polygons.psql',
  'text!queries/twitts.psql',

], function($, _, underscoreString, Backbone, Class,PARKPOLIGONSCSS,TWITTSCSS, PARKPOLIGONS,TWITTS) {

  var CartoDBLayer = Class.extend({

    defaults: {
      user_name: 'simbiotica',
      type: 'cartodb',
      sublayers: []
    },

    init: function(map,options) {
      this.map = map;
      this.options = _.extend({}, this.defaults, options || {});

      this._setGeom();
      this._setPoints();

      // this._setLayers();
      // this._setListeners();
      // this.$legend = $('#legendView');
      // this.layers = layersService;
    },

    //Get Parks 
    _setGeom: function(){
      var cartodbOptions = _.extend({}, this.options, {
        sublayers: [{
          sql: PARKPOLIGONS,
          cartocss: PARKPOLIGONSCSS
        }]
      });

      cartodb.createLayer(this.map, cartodbOptions)
        .addTo(this.map)
        .on('done', _.bind(function() {
          this._setBounds();
        }, this))
        .on('error', function(err) {
          throw err;
        });
    },

    //Get Parks 
    _setPoints: function(){
      var cartodbOptions = _.extend({}, this.options, {
        sublayers: [{
          sql: TWITTS,
          cartocss: TWITTSCSS
        }]
      });

      cartodb.createLayer(this.map, cartodbOptions)
        .addTo(this.map)
        .on('done', _.bind(function() {
          console.log('done');
        }, this))
        .on('error', function(err) {
          throw err;
        });
    },

    //Get Bounds  
    _setBounds: function(){
      var sql = new cartodb.SQL({ user: 'simbiotica' });
      sql.getBounds(PARKPOLIGONS).done(_.bind(function(bounds) {
        this.map.fitBounds(bounds);
      },this));      
    }

    // _setListeners: function() {
    //   Backbone.Events.on('timeline:change', _.bind(function(columnName) {
    //     if (columnName) {
    //       var layerData = this.layers.getData(this.currentLayer);
    //       var sql = _.str.sprintf(layerData.sql, {column_name: columnName});
    //       this.layer.setSQL(sql);
    //     }
    //   }, this));
    // },

    // setLayer: function(map, params) {

    //   this.currentLayer = params.layer || this.currentLayer;

    //   var sublayer = params.sublayer;
    //   var layerData = this.layers.getData(this.currentLayer);
    //   var sql;

    //   if (layerData.timeline) {
    //     sql = _.str.sprintf(layerData.sql, {column_name: layerData.timelineData[0].column});
    //   } else if (layerData.subLayers) {
    //     sql = _.str.sprintf(layerData.sql, {column_name: _.findWhere(layerData.subLayersData, {
    //       column: sublayer
    //     }).column});
    //   } else {
    //     sql = layerData.sql;
    //   }

    //   if (!sublayer) {
    //     this.removeLegend();
    //   }
      
      

    //   if (this.layer) {
    //     this.layer.setSQL(sql);
    //     this.layer.setCartoCSS(layerData.cartocss);
    //     this.layer.setInteractivity(layerData.interactivity);

    //     if (layerData.legend) {
    //       this._addLegend(layerData, sublayer);
    //     }

    //     if (layerData.infowindow) {
    //       this.layer.setInteraction(true);
    //     } else {
    //       this.layer.setInteraction(false);
    //     }

    //     return this.layer;
    //   }

    //   var cartodbOptions = _.extend({}, this.options, {
    //     sublayers: [{
    //       sql: sql,
    //       cartocss: layerData.cartocss
    //     }]
    //   });

    //   cartodb.createLayer(map, cartodbOptions)
    //     .addTo(map)
    //     .on('done', _.bind(function(layer) {
    //       this.layer = layer.getSubLayer(0);
    //       if (layerData.legend) {

    //         this._addLegend(layerData, sublayer);
    //       }
    //       if (layerData.infowindow) {
    //         this._addInfowindow(map, this.layer, layerData);
    //       }
    //     }, this))
    //     .on('error', function(err) {
    //       throw err;
    //     });

    // },

    // removeLayer: function() {
    //   if (this.layer) {
    //     this.layer.remove();
    //     this.layer = null;
    //   }
    // },

    // _addLegend: function(layerData, sublayer) {
    //   Backbone.Events.trigger('Legend:change',{layer: layerData});
    // },

    // removeLegend: function() {
    //   Backbone.Events.trigger('Legend:remove');
    // },

    // _addInfowindow: function(map, layer, layerData) {
    //   this.infowindow = cdb.vis.Vis.addInfowindow(map, layer, layerData.interactivity, {
    //     infowindowTemplate: INFOWINDOW_TEMPLATE
    //   });
    // },

    // removeInfowindow: function() {
    //   if (this.layer) {
    //     this.infowindow.$el.hide();
    //   }
    // }

  });

  return CartoDBLayer;

});