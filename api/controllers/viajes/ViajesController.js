/**
 * Created by jose on 13/10/16.
 */
const _ = require('lodash');
var request = require('request');
var moment = require('moment');
module.exports = {
    identity: 'Viajes',

    findOneFuec(req, res){
        Viajes.findOne({id: req.allParams().id}).then(function (viaje) {
            Empresas.findOne({id: viaje.empresa}).then(function (empresa) {
                empresa.fecha_resolucion = moment(empresa.fecha_resolucion).locale("es").format('Do MMMM YYYY,');
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
            });
        });
    },
    find(req, res){
        Viajes.find().populate('conductor').populate('vehiculo').populate('ruta').exec((err, viajes) => {
            if (err) return res.negotiate(err);
            return res.ok(viajes.map(viaje => {
                return {
                    id: viaje.id,
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
