'use strict';

var mongoose = require('mongoose');
var debug = require('debug')('openspacescity');
var app = require('./app');
var server;

/**
 * Set application port
 */
app.set('port', process.env.PORT || 3000);

/**
 * Create and init Express server
 */
server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
