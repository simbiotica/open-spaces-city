var express = require('express');
var apiRouter = express.Router();

/**
 * Application Router
 * @param  {Object} app  Express application instance
 */
module.exports = function(app) {

  'use strict';

  var appController = require('../app/controllers/app_controller');
  var sentimentController = require('../app/controllers/api/v1/sentiment_controller');
  var afinnController = require('../app/controllers/api/v1/afinn_controller');
  var tweetsController = require('../app/controllers/api/v1/tweets_controller');

  /**
   * API
   */
  apiRouter.route('/sentiment')
    .get(sentimentController.index);

  apiRouter.route('/afinn')
    .get(afinnController.index);

  apiRouter.route('/tweets')
    .get(tweetsController.index);

  apiRouter.route('/get-tweets')
    .get(tweetsController.getTweets);

  /**
   * Router
   */
  app.use('/api/v1', apiRouter);
  app.get('/', appController.index);

};
