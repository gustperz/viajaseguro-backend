/**
 * Created by jose on 28/09/16.
 */
const forEach = require('lodash').each;

module.exports = {
    identity: 'Solicitudes',

    find(req, res) {
        if (!req.isSocket) return res.badRequest();
        Solicitudes.find(req.options.where).then(solicitudes => {
            sails.sockets.join(req, 'central'+req.user.central.id+'watcher');
            forEach(solicitudes, function (solicitud) {
                sails.sockets.join(req, 'solicitud'+solicitud.id+'watcher');
            });
            return res.ok(solicitudes);
        }).catch(res.negotiate);
    },

    create(req, res) {
        if (!req.isSocket) return res.badRequest();
        var data = req.allParams();
        data.central = req.user.central;
        Solicitudes.create(data).then(solicitud => {
            sails.sockets.join(req, 'solicitud'+solicitud.id+'watcher');
            sails.sockets.join(req, 'central'+req.user.central.id+'watcher');
            sails.sockets.broadcast('central'+solicitud.central+'watcher', 'newSolicitud', solicitud, req);

            forEach(solicitud.pasajeros, function (pasajero) {
                if(pasajero.identificacion) {
                    Clientes.findOrCreate({identificacion: pasajero.identificacion}, pasajero).exec(() => {});
                }
            });

            return res.ok(solicitud);
        }).catch(res.negotiate);
    },

    reject(req, res){
        if (!req.isSocket) return res.badRequest();
        Solicitudes.destroy({id: req.params.id}).then(() => {
            sails.sockets.broadcast('solicitud'+req.params.id+'watcher', 'reject', req.allParams());
            return res.ok();
        }).catch(res.negotiate);
    },

    cancel(req, res){
        // if (!req.isSocket) return res.badRequest();
        Solicitudes.destroy({id: req.params.id}).then(() => {
            sails.sockets.broadcast('solicitud'+req.params.id+'watcher', 'cancel', req.allParams());
            return res.ok();
        }).catch(res.negotiate);
    },

    update(req, res){
        if (!req.isSocket) return res.badRequest();
        Solicitudes.findOne(req.params.id).then((solicitud) => {
            solicitud.estado = req.allParams().estado;
            req.allParams().conductor && (solicitud.conductor = req.allParams().conductor);
            solicitud.save();
            sails.sockets.broadcast('solicitud'+solicitud.id+'watcher', 'updateEstado', req.allParams());
            return res.ok();
        }).catch(res.negotiate);
    }

};
