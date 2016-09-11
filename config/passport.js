"use strict";

/**
 * Passport configuration file where you should configure all your strategies
 * @description :: Configuration file where you configure your passport authentication
 */

const
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    jwt_secret = require('../config/jwt.js').jwt.secret;

const LOCAL_STRATEGY_CONFIG = {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
};

const JWT_STRATEGY_CONFIG = {
    secretOrKey: jwt_secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    authScheme: 'Bearer',
    session: false,
    passReqToCallback: true
};

const _onLocalStrategyAuth = (req, username, password, next) => {
    User
        .findOne({[LOCAL_STRATEGY_CONFIG.usernameField]: username})
        .then(user => {
            if (!user) return next(null, null, sails.config.errors.USER_NOT_FOUND);
            if (!HashService.bcrypt.compareSync(password, user.password)) return next(null, null, sails.config.errors.USER_NOT_FOUND);
            if (user.rol == 'CENTRAL_EMPRESA') {
                Centrales.findOne({user: user.id}).exec((err, central) => {
                    if (err || !central) return next(null, null, sails.config.errors.USER_NOT_VALID);
                    Empresas.findOne({id: central.empresa}).exec((err, empresa) => {
                        if (!empresa.activa)  return next(null, null, sails.config.errors.USER_NOT_INACTIVE);
                        user.empresa = {
                            id: empresa.id,
                            nombre_corto: empresa.nombre_corto,
                            nombre_largo: empresa.nombre_largo,
                            logo: empresa.logo,
                        };
                        return next(null, user, {});
                    });
                });
            } else if (user.rol == 'EMPRESA') {
                Empresa.findOne({user: user.id}).exec((err, empresa) => {
                    if (err || !empresa) return next(null, null, sails.config.errors.USER_NOT_VALID);
                    if (!empresa.activa)  return next(null, null, sails.config.errors.USER_NOT_INACTIVE);
                    user.empresa = {
                        id: empresa.id,
                        nombre_corto: empresa.nombre_corto,
                        logo: empresa.logo,
                    };
                    return next(null, user, {});
                });
            } else {
                return next(null, user, {});
            }
        })
        .catch(next);
};

const _onJwtStrategyAuth = (req, payload, next) => {
    User
        .findOne({id: payload.id})
        .then(user => {
            if (!user) return next(null, null, sails.config.errors.USER_NOT_FOUND);
            return next(null, user, {});
        })
        .catch(next);
};

passport.use(new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));
passport.use(new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));

module.exports.passport = {
    onPassportAuth(req, res, error, user, info) {
        if (error || !user) return res.negotiate(error || info);
        return res.ok({
            token: JWTService.token.encode({id: user.id}),
            user: user
        });
    }
};
