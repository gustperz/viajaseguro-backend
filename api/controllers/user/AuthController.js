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
    passport.authenticate('local', function (error, user, info) {
      if (error || !user) return res.negotiate(error || info);
      async.series([
          function (callback) {
            if (user.rol === 'CENTRAL_EMPRESA') {
              Centrales.findOne({user: user.id}).populate('empresa')
                .then((central)=> {
                    user.central = {
                        id: central.id
                    };
                    user.empresa = {
                        id: central.empresa.id,
                        nombre_corto: central.empresa.nombre_corto,
                        nombre_largo: central.empresa.nombre_largo,
                        logo: central.empresa.logo,
                        activa: central.empresa.activa,
                        tipo: central.empresa.tipo
                    };
                  callback(user);
                }).catch(res.negotiate);
            }
            else if (user.rol === 'EMPRESA') {
              Empresas.findOne({user: user.id})
                .then((empresa)=> {
                    if (!empresa.activa) return res.unauthorized(sails.config.errors.USER_NOT_INACTIVE);
                    user.empresa = {
                        id: empresa.id,
                        nombre_corto: empresa.nombre_corto,
                        logo: empresa.logo,
                    };
                  callback(user);
                }).catch(res.negotiate);
            }
            else {
                callback(user);
            }
          }
        ],
        function (user) {
          return res.ok({
            token: JWTService.token.encode({id: user.id}),
            user: user
          });
        });

    })(req, res);
  },

  registro(req, res) {
    User
      .create(_.omit(req.allParams(), 'id'))
      .then(function (user) {
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

