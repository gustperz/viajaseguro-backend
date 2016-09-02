/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const _ = require('lodash');
const passport = require('passport');

module.exports = {
  _config: {
    model: 'user'
  },

  authenticate(req, res) {
    passport.authenticate('local', _.partial(sails.config.passport.onPassportAuth, req, res))(req, res);
  },

  registro(req, res) {
    User
      .create(_.omit(req.allParams(), 'id'))
      .then(function (user){
        return {
          token: JWTService.token.encode({id: user.id}),
          user: user
        }
      })
      .then(res.created)
      .catch(res.negotiate);
  },

  refresh_token(req, res) {
    const auth_token = req.headers.authorization.split(' ');
    const oldDecoded = JWTService.token.decode(auth_token[1]);

    res.ok({
      token: JWTService.token.encode({id: oldDecoded.id})
    });
  }
};

