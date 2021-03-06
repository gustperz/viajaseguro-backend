/**
 * Created by jose on 28/09/16.
 */
const forEach = require('lodash').each;

module.exports = {
    identity: 'Solicitudes',

    find(req, res) {
        if (!req.isSocket) return res.badRequest();
        Solicitudes.find(req.options.where).then(solicitudes => {
            if(req.user.central)
                sails.sockets.join(req, 'central'+req.user.central.id+'watcher');
            if(req.user.conductor)
                sails.sockets.join(req, 'conductor'+req.user.conductor.id+'watcher');
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
            Conductores.findOne({id: solicitud.conductor}).then(function (conductor) {
                User.findOne({id: conductor.user}).then(function (user) {
                    var data = {
                        title : 'Nuevo pasajero',
                        body : 'Se te ah agregado un nuevo pasajero, verificalo en la lista',
                        type : 'newPasajero'
                    }
                    PusherService.send(data, user.reg_id);
                })
            });
            sails.sockets.join(req, 'solicitud'+solicitud.id+'watcher');
            sails.sockets.join(req, 'central'+req.user.central.id+'watcher');
            sails.sockets.broadcast('central'+solicitud.central+'watcher', 'newSolicitud', solicitud, req);
            sails.sockets.broadcast('conductor'+solicitud.conductor+'watcher', 'newPasajero', solicitud, req);

            if(solicitud.pasajeros.length == 1) {
                const pasajero = solicitud.pasajeros[0];
                Clientes.findOrCreate({identificacion: pasajero.identificacion}, pasajero)
                    .exec((error, cliente) => {
                        if(error) return sails.log.error(error);
                        if(pasajero.telefono) cliente.telefono = pasajero.telefono;
                        if(pasajero.direccion) cliente.direccion = pasajero.direccion;
                        cliente.save();
                    });                
            } else {
                forEach(solicitud.pasajeros, function (pasajero) {
                    if(pasajero.identificacion) {
                        Clientes.findOrCreate({identificacion: pasajero.identificacion}, pasajero).exec(() => {});
                    }
                });
            }

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
