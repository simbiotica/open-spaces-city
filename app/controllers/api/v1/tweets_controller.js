var request = require('request');
var qs = require('querystring');
var CONSUMER_KEY = 'C82vnVLgfp99hUNzTf5bDbewX';
var CONSUMER_SECRET = 'NY0CNdUM5I5n1VP4jdv5AA0KlZTHpi1GWqIgOIVVAoO5V44IiE';

// Twitter OAuth
var oauth = {
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET
    },
    url = 'https://api.twitter.com/oauth/request_token';

module.exports = {

  index: function(req, res) {

    request.post({url:url, oauth:oauth}, function (e, r, body) {
    // Ideally, you would take the body in the response
    // and construct a URL that a user clicks on (like a sign in button).
    // The verifier is only available in the response after a user has
    // verified with twitter that they are authorizing your app.
    var access_token = qs.parse(body)
      , oauth =
        { consumer_key: CONSUMER_KEY
        , consumer_secret: CONSUMER_SECRET
        , token: access_token.oauth_token
        , verifier: access_token.oauth_verifier
        }
      , url = 'https://api.twitter.com/oauth/access_token'
      ;
    console.log(access_token);
    request.post({url:url, oauth:oauth}, function (e, r, body) {
      var perm_token = qs.parse(body)
        , oauth =
          { consumer_key: CONSUMER_KEY
          , consumer_secret: CONSUMER_SECRET
          , token: perm_token.oauth_token
          , token_secret: perm_token.oauth_token_secret
          }
        , url = 'https://api.twitter.com/1.1/users/show.json?'
        , params =
          { screen_name: perm_token.screen_name
          , user_id: perm_token.user_id
          }
        ;
      url += qs.stringify(params);
      console.log(perm_token);
      request.get({url:url, oauth:oauth, json:true}, function (e, r, user) {
        console.log(user)
      })
    })
  })

  }

};
