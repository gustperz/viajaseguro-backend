/**
 * Created by jose on 13/10/16.
 */
const _ = require('lodash');
const moment = require('moment');
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
    },

    create(req, res){
        var data = req.allParams();
        async.parallel({
            empresa: cb => {
                Empresas.findOne(req.user.empresa.id).exec(cb);
            },
            max_contrato: cb => {
                Viajes.find({empresa: req.user.empresa.id}).max('contrato').exec(cb);
            },
            max_cont_dia: cb => {
                Viajes.find({empresa: req.user.empresa.id, fecha: moment().format('YYYY-MM-DD')}).max('cont_dia').exec(cb);
            }
        }, function (err, result) {
            if(err) return res.negotiate(err);

            const territorial = result.empresa.ndireccion_terr;
            const resolucion = ('0000' + result.empresa.nresolucon).slice(-4);
            const fecha_resol = moment(result.empresa.fecha_resolucion).format('YY');
            const fecha_exp = moment().format('YYYY');
            const contrato = result.max_contrato ? ('000' + (+result.max_contrato[0].contrato + 1)).slice(-4) : '0001';
            const cont_dia = result.max_cont_dia ? ('000' + (+result.max_cont_dia[0].cont_dia + 1)).slice(-4) : '0001';

            data.contrato = contrato;
            data.cont_dia = cont_dia;
            data.empresa = result.empresa.id;
            data.fuec = territorial+resolucion+fecha_resol+fecha_exp+contrato+cont_dia;
            Viajes.create(data).then(viaje => {
                viaje.clientes.add(data.pasajeros.map(pasajero => pasajero.identificacion));
                viaje.save();
                return res.ok();
            }).catch(res.negotiate);
        });
    }

};
