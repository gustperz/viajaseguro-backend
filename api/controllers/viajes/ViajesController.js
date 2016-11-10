/**
 * Created by jose on 13/10/16.
 */
const forEach = require('lodash').forEach;
const remove = require('lodash').remove;
const omit = require('lodash').omit;
const moment = require('moment');
var request = require('request');

module.exports = {
    identity: 'Viajes',

    findOneFuec(req, res){
        Viajes.findOne({id: req.allParams().id}).populate('conductor').populate('vehiculo').populate('clientes').then(function (viaje) {
            viaje.conductor.fecha_licencia = moment(viaje.conductor.fecha_licencia).format('L');
            Empresas.findOne({id: viaje.empresa}).then(function (empresa) {
                empresa.fecha_resolucion = moment(empresa.fecha_resolucion).locale("es").format('LL');
                if(viaje.vehiculo.modalidad === 'especial'){
                    var data = {
                        template: {'shortid': 'B144VRaR'},
                        data: {
                            empresa: empresa,
                            contrato: {
                                dia: parseInt(moment(viaje.fecha).locale('es').format('Do')),
                                mes: moment(viaje.fecha).locale('es').format('MMMM'),
                                ano: moment(viaje.fecha).format('YYYY')
                            },
                            viaje: viaje
                        }
                    }
                    // console.log(data.data.contrato);
                }else if(viaje.vehiculo.modalidad === 'intermunicipal'){
                    var data = {
                        template: {"shortid": "S102cRpR"},
                        data: {
                            empresa: empresa,
                            contrato: {
                                dia: moment(viaje.fecha).format('dd'),
                                mes: moment(viaje.fecha).locale('es').format('MMMM'),
                                ano: moment(viaje.fecha).format('YYYY')
                            },
                            viaje: viaje
                        }
                    }
                }
                var options = {
                    method: 'POST',
                    url: 'http://localhost:5488/api/report',
                    headers: {
                        'content-Type' : 'application/json',
                    },
                    json: data
                };
                request(options).pipe(res);
            });
        });
    },
    find(req, res){
        Viajes.find({
            where: {
                central: req.user.central.id,
            },
            sort: 'fecha DESC'
        }).populate('conductor').populate('vehiculo').exec((err, viajes) => {
            if (err) return res.negotiate(err);
            return res.ok(viajes);
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

            if(!territorial || !resolucion) return res.notFound('No se han registrado todos los datos de la empresa', {code: 'E_INCOMPLETE_EMPRESA_DATA'});

            data.contrato = contrato;
            data.cont_dia = cont_dia;
            data.central = req.user.central.id;
            data.empresa = result.empresa.id;
            data.fuec = territorial+resolucion+fecha_resol+fecha_exp+contrato+cont_dia;
            Viajes.create(data).then(viaje => {
                forEach(data.pasajeros, pasajero =>
                    PasajerosViaje.create({viaje: viaje.id, cliente: pasajero.identificacion}).exec(()=>{})
                );
                finishSolicitudes(viaje.conductor, viaje.central);
                broadcastTurnos(viaje.ruta, viaje.conductor);

                Conductores.update(viaje.conductor, {
                    estacion: data.estacion,
                    estado: 'en_ruta'
                }).then(updateRecords => {
                    sails.sockets.broadcast('conductor' + viaje.conductor + 'watcher', 'madeDespacho');
                    sails.log.silly('broadcast conductor' + viaje.conductor + 'watcher:madeDespacho');

                    return generateFuec(viaje);
                });
            }).catch(res.negotiate);
        });

        function finishSolicitudes(conductor, central) {
            Solicitudes.find({conductor: conductor}).then(soliicitudes => {
                forEach(soliicitudes, solicitud => {
                    sails.sockets.broadcast('solicitud' + solicitud.id + 'watcher', 'vehiculo_en_camino');
                    sails.log.silly('broadcast solicitud' + solicitud.id + 'watcher:vehiculo_en_camino');
                });
                Solicitudes.destroy({conductor: conductor, estado: 'a'}).exec(() => {
                    sails.sockets.broadcast('central'+central+'watcher', 'makingDespacho');
                    sails.log.silly('broadcast central'+central+'watcher:makingDespacho');
                });
            });
        }

        function broadcastTurnos(ruta, conductor) {
            TurnosRuta.find({ruta: ruta}).then(turnos => {
                async.series([
                    cb => TurnosRuta.destroy({ruta: ruta}).exec(cb),
                    cb => {
                        remove(turnos, turnos => turnos.conductor === conductor);
                        async.forEachOf(turnos, (turno, index, cb) => {
                            turno.pos = index + 1;
                            TurnosRuta.create(turno).then(() => {
                                sails.sockets.broadcast('conductor' + turno.conductor + 'watcher', 'turnoUpdate', {pos: turno.pos});
                                return cb();
                            }).catch(cb);
                        }, cb);
                    }
                ], function() {
                    TurnosRuta.broadcastChange(ruta);
                });
            });
        }

        function generateFuec(Eviaje) {
            Viajes.findOne({id: Eviaje.id}).populate('conductor').populate('vehiculo').populate('clientes').then(function (viaje) {
                viaje.conductor.fecha_licencia = moment(viaje.conductor.fecha_licencia).format('L');
                Empresas.findOne({id: viaje.empresa}).then(function (empresa) {
                    empresa.fecha_resolucion = moment(empresa.fecha_resolucion).locale("es").format('LL');
                    if(viaje.vehiculo.modalidad === 'especial'){
                        var data = {
                            template: {'shortid': 'B144VRaR'},
                            data: {
                                empresa: empresa,
                                contrato: {
                                    "dia": moment(viaje.fecha).day(),
                                    "mes": moment(viaje.fecha).locale('es').format('MMMM'),
                                    "ano": moment(viaje.fecha).year()
                                },
                                viaje: viaje
                            }
                        }
                    }else if(viaje.vehiculo.modalidad === 'intermunicipal'){
                        var data = {
                            template: {"shortid": "S102cRpR"},
                            data: {
                                empresa: empresa,
                                contrato: {
                                    dia: moment(viaje.fecha).day(),
                                    mes: moment(viaje.fecha).locale('es').format('MMMM'),
                                    ano: moment(viaje.fecha).year()
                                },
                                viaje: viaje
                            }
                        }
                    }
                    var options = {
                        method: 'POST',
                        url: 'http://localhost:5488/api/report',
                        headers: {
                            'content-Type' : 'application/json',
                        },
                        json: data
                    };
                    request(options).pipe(res);
                });
            });
        }
    }

};