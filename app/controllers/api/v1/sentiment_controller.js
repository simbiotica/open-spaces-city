'use strict';

var sentiment = require('../../../../lib/sentiment');

module.exports = {

  /**
   * List AFINN
   * @param  {Object} req  Request
   * @param  {Object} res  Response
   */
  index: function(req, res) {
    if (!req.query.phrase || req.query.phrase === '') {
      res.json({
        error: 'phrase param is required (?phrase=Hello)'
      });
    }
    res.json(sentiment(req.query.phrase));
  }

};
