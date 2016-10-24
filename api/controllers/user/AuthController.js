/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const omit = require('lodash').omit;
const pick = require('lodash').pick;
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
                        if (user.rol === 'DESPACHADOR_EMPRESA_DES') return res.unauthorized(sails.config.errors.USER_NOT_INACTIVE);
                        if (user.rol === 'CENTRAL_EMPRESA' || user.rol === 'DESPACHADOR_EMPRESA') {
                            const filter = user.rol === 'CENTRAL_EMPRESA' ? {user: user.id} : {despachador: user.id};
                            Centrales.findOne(filter).populate('empresa')
                                .then((central)=> {
                                    if (!central.empresa.activa) return res.unauthorized(sails.config.errors.USER_NOT_INACTIVE);
                                    user.central = {
                                        id: central.id
                                    };
                                    user.empresa = pick(central.empresa, [
                                        'id',
                                        'nombre_corto',
                                        'nombre_largo',
                                        'logo',
                                        'activa',
                                        'tipo',
                                        'especial',
                                        'intermunicipal'
                                    ]);
                                    user.espec = central.empresa.especial;
                                    user.mod_intmpal = central.empresa.intermunicipal;
                                    callback(user);
                                }).catch(res.negotiate);
                        }
                        else if (user.rol === 'EMPRESA') {
                            Empresas.findOne({user: user.id})
                                .then((empresa)=> {
                                    if (!empresa.activa) return res.unauthorized(sails.config.errors.USER_NOT_INACTIVE);
                                    user.empresa = pick(empresa, [
                                        'id',
                                        'nombre_corto',
                                        'logo',
                                        'especial',
                                        'intermunicipal'
                                    ]);
                                    user.espec = empresa.especial;
                                    user.mod_intmpal = empresa.intermunicipal;
                                    callback(user);
                                }).catch(res.negotiate);
                        }
                        else if (user.rol === 'CONDUCTOR') {
                            Conductores.findOne({user: user.id})
                                .then((conductor)=> {
                                    if (!conductor.activo) return res.unauthorized(sails.config.errors.USER_NOT_INACTIVE);
                                    user.conductor = pick(conductor, [
                                        'id',
                                        'nombres',
                                        'apellidos',
                                        'imagen',
                                        'empresa',
                                        'identificacion',
                                        'vehiculo'
                                    ]);
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
            .create(omit(req.allParams(), 'id'))
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
    },

    updatePass(req, res) {
        User.update(req.params.id, {password: req.allParams().password})
            .then(res.ok)
            .catch(res.negotiate);
    }
};

