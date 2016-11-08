/**
 * Created by Jose Soto Acosta on 11/09/2016.
 */
/**
 * ClientesController
 *
 * @description :: Server-side logic for managing Conductores
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const _ = require('lodash');

module.exports = {
    identity: 'Clientes',

    create(req, res) {
        const data = req.allParams();
        data.user = {
            username: data.email,
            password: data.password,
            rol: 'CLIENTE',
            email: data.email
        };
        Clientes.create(data)
            .then(res.ok)
            .catch(error => {
                if (!error.invalidAttributes.username && data.user.username) {
                    User.destroy({username: data.user.username}).exec(() => {
                    });
                }
                res.negotiate(error);
            });
    },

    createSolicitud(req, res) {
        var data = req.allParams();
        Solicitudes.create(data).then(solicitud => {
            sails.sockets.join(req, 'solicitud'+solicitud.id+'watcher');
            sails.sockets.broadcast('central'+solicitud.central+'watcher', 'newSolicitud', solicitud, req);

            _.forEach(solicitud.pasajeros, function (pasajero) {
                if(pasajero.identificacion) {
                    Clientes.findOrCreate({identificacion: pasajero.identificacion}, pasajero).exec(() => {});
                }
            });

            return res.ok(solicitud);
        }).catch(res.negotiate);
    },
};
