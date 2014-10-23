var _ = require('underscore');
var AFINN = require('../data/afinn.json');

/**
 * Sentiment
 * @param  {[type]} phrase [description]
 * @return {[type]}        [description]
 */
module.exports = function(phrase) {

  var scores;

  function tokenize(input) {
    return input
            .replace(/[^a-zA-Z- ]+/g, '')
            .replace('/ {2,}/',' ')
            .toLowerCase()
            .split(' ');
  }

  scores = _.flatten(_.map(tokenize(phrase), function(word) {
    return _.filter(AFINN, function(value, key) {
      return key === word;
    });
  }));

  return {
    score: _.isEmpty(scores) ? 0 : _.reduce(scores, function(memo, num){
      return memo + num;
    }, 0)
  };

};
