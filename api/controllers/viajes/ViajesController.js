/**
 * Created by jose on 13/10/16.
 */
const _ = require('lodash');
var request = require('request');

module.exports = {
    identity: 'Viajes',

    generateFuec(req, res){
        var empresa = req.user.empresa;
        var data = {
            template: {'shortid': 'B144VRaR'},
            data: {
                empresa: empresa
            },
            options: {
                preview: true
            }
        }
        var options = {
            uri: 'http://localhost:5488/api/report  ',
            method: 'POST',
            json: data
        }
        request(options).pipe(res);
    },
    findFuec(req, res){
        var empresa = req.user.empresa;
        var data = {
            template: {'shortid': 'B144VRaR'},
            data: {
                empresa: empresa
            },
            options: {
                preview: true
            }
        }
        var options = {
            uri: 'http://localhost:5488/api/report  ',
            method: 'POST',
            json: data
        }
        request(options).pipe(res);
    },
    find(req, res){
        Viajes.find().populate('conductor').populate('vehiculo').populate('ruta').exec((err, viajes) => {
            if (err) return res.negotiate(err);
            return res.ok(viajes.map(viaje => {
                return {
                    conductor: {
                        nombre: viaje.conductor.nombres + ' ' + viaje.conductor.apellidos
                    },
                    vehiculo: {
                        placa: viaje.vehiculo.placa
                    },
                    ruta: {
                        origen: viaje.ruta.origen.ciudad + ', ' + viaje.ruta.origen.departamento,
                        destino: viaje.ruta.destino.ciudad + ', ' + viaje.ruta.destino.departamento
                    }
                }
            }));
        });
    }

};
