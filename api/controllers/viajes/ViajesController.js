/**
 * Created by jose on 13/10/16.
 */
const _ = require('lodash');
var request = require('request');
var moment = require('moment');
module.exports = {
    identity: 'Viajes',

    findOneFuec(req, res){
        Viajes.findOne({id: req.allParams().id}).populate('conductor').populate('vehiculo').then(function (viaje) {
            Empresas.findOne({id: viaje.empresa}).then(function (empresa) {
                empresa.fecha_resolucion = moment(empresa.fecha_resolucion).locale("es").format('LL');
                var data = {
                    template: {'shortid': 'B144VRaR'},
                    data: {
                        empresa: empresa,
                        contrato: {
                            dia: moment(viaje.fecha).day(),
                            mes: moment(viaje.fecha).locale('es').format('MMMM'),
                            ano: moment(viaje.fecha).year()
                        },
                        viaje: viaje
                    },
                    options: {
                        preview: true
                    }
                }
                console.log(data)
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
