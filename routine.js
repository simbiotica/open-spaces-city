var _ = require('underscore');
var sentiment = require('./lib/sentiment');
var debug = require('debug')('openspacescity');
var Tweet = require('./app/models/tweet');
var twitter = require('twitter');
var twit = new twitter({
    consumer_key: 'C82vnVLgfp99hUNzTf5bDbewX',
    consumer_secret: 'NY0CNdUM5I5n1VP4jdv5AA0KlZTHpi1GWqIgOIVVAoO5V44IiE',
    access_token_key: '140712406-UXhldqAE8JCTDMh19tMYyKWP9bjptWRoQ5EgLKnk',
    access_token_secret: 'RulpLSmqhVTKFNgrx4XZrVR5E0jj9BS4yCWDJGulNYxwp'
});

module.exports = function() {

  'use strict';

  // var TIMEOUT = 60 * 10;
  var result = [];

  // setInterval(function() {

    twit.search('central park', {
      count: 100
    }, function(tweets) {

      result = _.map(tweets.statuses, function(tweet) {
        return {
          tweetId: tweet.id,
          text: tweet.text,
          score: sentiment(tweet.text).score,
          coordinates: tweet.coordinates,
          date: tweet.created_at,
          hashtags: _.pluck(tweet.entities.hashtags, 'text')
        };
      });

      Tweet.create(result, function(err) {
        if (err) {
          debug(err);
        }
        debug('Fetch tweets successfully!');
      });

    });

  // }, TIMEOUT);

};
