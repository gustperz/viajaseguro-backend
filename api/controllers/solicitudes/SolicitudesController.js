/**
 * Created by jose on 28/09/16.
 */
const _ = require('lodash');

module.exports = {
    identity: 'Solicitudes',

    newSolicitud(req, res) {
        var data = req.allParams();
        if (!req.isSocket) return res.badRequest();
        sails.sockets.join(req, 'central'+data.central.id+'watcher');
        var solicitud = {
            id: 1,
            tipo: 'Pasajeros',
            codigo_ruta: 44279,
            cliente :{
                identificacion: '123456789',
                nombre: 'Maria Cristina',
                telefono: '3015941826',
                direccion: 'Por hay'
            },
            pasajeros: [
                {
                    cedula: '1234567890',
                    nombre: 'Fulano'
                },
                {
                    cedula: '9876543210',
                    nombre: 'Fulano 2'
                }
            ]
        };
        sails.sockets.broadcast('central'+data.central.id+'watcher', 'newSolicitud', solicitud);
        return res.ok();
    },

    rejectSolicitud(req, res){
        const solicitud = req.allParams();
        solicitud.estado = 'r';
        if (!solicitud.id) res.badRequest();
        if(solicitud.id){
            Solicitudes.update({id: solicitud.id},{estado :solicitud.estado}).then(function (solicitud) {
                sails.sockets.broadcast('cliente' + solicitud.cliente + 'watcher', 'rejectSolicitud', {mes: 'rechazada'});
            })
        }
        return res.ok();
    },

    acceptSolicitud(req, res){
        const solicitud = req.allParams();
        solicitud.estado = 'a';
        if (!solicitud.id) res.badRequest();
        if(solicitud.id){
            Solicitudes.update({id: solicitud.id},
                {estado :solicitud.estado},
                {conductor: solicitud.conductor},
                {central: req.user.central.id}
                ).then(function (solicitud) {
                sails.sockets.broadcast('cliente' + solicitud.cliente + 'watcher', 'acceptSolicitud', {mes: 'rechazada'});
            })
        }
        return res.ok();
    }

};
