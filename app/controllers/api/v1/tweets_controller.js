'use strict';

var _ = require('underscore');
var sentiment = require('../../../../lib/sentiment');
var json2csv = require('json2csv');
var Tweeet = require('../../../models/tweet');
var twitter = require('twitter');
var twit = new twitter({
    consumer_key: 'C82vnVLgfp99hUNzTf5bDbewX',
    consumer_secret: 'NY0CNdUM5I5n1VP4jdv5AA0KlZTHpi1GWqIgOIVVAoO5V44IiE',
    access_token_key: '140712406-UXhldqAE8JCTDMh19tMYyKWP9bjptWRoQ5EgLKnk',
    access_token_secret: 'RulpLSmqhVTKFNgrx4XZrVR5E0jj9BS4yCWDJGulNYxwp'
});

module.exports = {

  index: function(req, res) {

    var format = req.query.format;

    Tweeet.find({}, function(err, tweets) {
      if (format === 'csv') {
        return json2csv({data: tweets, fields: ['tweetId', 'text', 'score', 'coordinates', 'hashtags', 'date']}, function(err, csv) {
          if (err) {
            res.json(err);
          }
          res.set('Content-Type', 'text/plain');
          res.send(csv);
        });
      }

      res.json(tweets);
    });

  },

  getTweets: function(req, res) {

    var format = req.query.format, result = [];

    twit.search('park', {
      count: req.query.count || 100,
      geocode: req.query.geocode || '40.7056308,-73.9780035,10km'
    }, function(tweets) {
      result = _.map(tweets.statuses, function(tweet) {
        return {
          text: tweet.text,
          score: sentiment(tweet.text).score,
          coordinates: tweet.coordinates
        };
      });

      if (format === 'json') {
        return res.json(result);
      }

      json2csv({data: result, fields: ['tweetId', 'text', 'score', 'coordinates', 'hashtags', 'date']}, function(err, csv) {
        if (err) {
          res.json(err);
        }
        res.set('Content-Type', 'text/plain');
        res.send(csv);
      });

    });

  }

};
