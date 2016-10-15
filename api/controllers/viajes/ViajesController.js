/**
 * Created by jose on 13/10/16.
 */
const forEach = require('lodash').forEach;
const moment = require('moment');
var request = require('request');

module.exports = {
    identity: 'Viajes',

    findOneFuec(req, res){
        Viajes.findOne({id: req.allParams().id}).populate('conductor').populate('vehiculo').populate('clientes').then(function (viaje) {
            viaje.conductor.fecha_licencia = moment(viaje.conductor.fecha_licencia).format('L');
            Empresas.findOne({id: viaje.empresa}).then(function (empresa) {
                empresa.fecha_resolucion = moment(empresa.fecha_resolucion).locale("es").format('LL');
                if(viaje.vehiculo.modalidad === false){
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
                }else if(viaje.vehiculo.modalidad === true){
                    var data = {
                        template: {'shortid': 'S102cRpR'},
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
        Viajes.find().populate('conductor').populate('vehiculo').populate('clientes').exec((err, viajes) => {
            if (err) return res.negotiate(err);
            return res.ok(viajes.map(viaje => {
                return {
                    id: viaje.id,
                    fuec: viaje.fuec,
                    origen: viaje.origen,
                    destino: viaje.destino,
                    conductor: {
                        nombre: viaje.conductor.nombres + ' ' + viaje.conductor.apellidos
                    },
                    vehiculo: {
                        placa: viaje.vehiculo.placa
                    },
                    clientes: viaje.clientes
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
                forEach(data.pasajeros, pasajero => {
                    PasajerosViaje.create({viaje: viaje.id, cliente: pasajero.identificacion}).exec(()=>{});
                });
                return res.ok();
            }).catch(res.negotiate);
        });
    }

};
