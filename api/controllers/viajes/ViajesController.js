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
        Viajes.findOne({id: req.allParams().id}).populate('empresa').populate('conductor').populate('vehiculo').then(function (viaje) {
            viaje.conductor.fecha_licencia = moment(viaje.conductor.fecha_licencia).format('L');
            viaje.empresa.fecha_resolucion = moment(viaje.empresa.fecha_resolucion).locale("es").format('LL');
            if (viaje.vehiculo.modalidad === 'especial') {
                var data = {
                    template: {'shortid': 'BkFSrPVXl'},
                    data: {
                        contrato: {
                            dia: parseInt(moment(viaje.fecha).format('Do')),
                            mes: moment(viaje.fecha).locale('es').format('MMMM'),
                            ano: moment(viaje.fecha).format('YYYY')
                        },
                        viaje: viaje
                    }
                }
                // console.log(data.data.contrato);
            } else if (viaje.vehiculo.modalidad === 'intermunicipal') {
                var data = {
                    template: {"shortid": "B1PZH7AR"},
                    data: {
                        ontrato : {
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
                    'content-Type': 'application/json',
                },
                json: data
            };
            request(options).pipe(res);
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
                Viajes.find({
                    empresa: req.user.empresa.id,
                    fecha: moment().format('YYYY-MM-DD')
                }).max('cont_dia').exec(cb);
            }
        }, function (err, result) {
            if (err) return res.negotiate(err);

            const territorial = result.empresa.ndireccion_terr;
            const resolucion = ('0000' + result.empresa.nresolucon).slice(-4);
            const fecha_resol = moment(result.empresa.fecha_resolucion).format('YY');
            const fecha_exp = moment().format('YYYY');
            const contrato = result.max_contrato ? ('000' + (+result.max_contrato[0].contrato + 1)).slice(-4) : '0001';
            const cont_dia = result.max_cont_dia ? ('000' + (+result.max_cont_dia[0].cont_dia + 1)).slice(-4) : '0001';

            if (!territorial || !resolucion) return res.notFound('No se han registrado todos los datos de la empresa', {code: 'E_INCOMPLETE_EMPRESA_DATA'});

            data.contrato = contrato;
            data.cont_dia = cont_dia;
            data.central = req.user.central.id;
            data.empresa = result.empresa.id;
            data.fuec = territorial + resolucion + fecha_resol + fecha_exp + contrato + cont_dia;
            Viajes.create(data).then(viaje => {

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
                    sails.sockets.broadcast('central' + central + 'watcher', 'makingDespacho');
                    sails.log.silly('broadcast central' + central + 'watcher:makingDespacho');
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
                ], function () {
                    TurnosRuta.broadcastChange(ruta);
                });
            });
        }

        function generateFuec(Eviaje) {
            Viajes.findOne({id: Eviaje.id}).populate('empresa').populate('conductor').populate('vehiculo').then(function (viaje) {
                viaje.conductor.fecha_licencia = moment(viaje.conductor.fecha_licencia).format('L');
                viaje.empresa.fecha_resolucion = moment(viaje.empresa.fecha_resolucion).locale("es").format('LL');
                if (viaje.vehiculo.modalidad === 'especial') {
                    var data = {
                        template: {'shortid': 'BkFSrPVXl'},
                        data: {
                            contrato: {
                                dia: parseInt(moment(viaje.fecha).format('Do')),
                                mes: moment(viaje.fecha).locale('es').format('MMMM'),
                                ano: moment(viaje.fecha).format('YYYY')
                            },
                            viaje: viaje
                        }
                    }
                } else if (viaje.vehiculo.modalidad === 'intermunicipal') {
                    var data = {
                        template: {"shortid": "B1PZH7AR"},
                        data: {
                            contrato : {
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
                        'content-Type': 'application/json',
                    },
                    json: data
                };
                request(options).pipe(res);
            });
        }
    },

    getViajes(req, res){
        Viajes.find({
            where: {
                empresa: req.allParams().id,
                fecha: limitFecha(req)
            },
            sort: 'fecha DESC'
        }).populate('conductor').populate('vehiculo').then(viajes => {
            return res.ok(viajes);
        })
    },

    printAllFuec(req, res){
        var data;
        var viajes = [];
        Viajes.find({
            where: {
                empresa: req.allParams().id,
                modalidad: 'especial',
                fecha: limitFecha(req)
            },
            sort: 'fecha ASC'
        }).populate('conductor').populate('vehiculo').populate('empresa').then(datos => {
            datos.forEach(function (viaje) {
                viaje.conductor.fecha_licencia = moment(viaje.conductor.fecha_licencia).format('L');
                viaje.empresa.fecha_resolucion = moment(viaje.empresa.fecha_resolucion).locale("es").format('LL');
                viaje.f_contrato = {
                    dia: parseInt(moment(viaje.fecha).format('Do')),
                    mes: moment(viaje.fecha).locale('es').format('MMMM'),
                    ano: moment(viaje.fecha).format('YYYY')
                }
                viajes.push(viaje);
            })
            if (req.allParams().contrato == 'true') {
                data = {
                    template: {'shortid': 'rJTXRSN7x'},
                    data: viajes
                }
            } else {
                data = {
                    template: {'shortid': 'B144VRaR'},
                    data: viajes
                }
            }
            var options = {
                method: 'POST',
                url: 'http://localhost:5488/api/report',
                headers: {
                    'content-Type': 'application/json',
                },
                json: data
            };
            request(options).pipe(res);
        })
    },

    printAllGeneric(req, res){
        var data;
        var viajes = [];
        Viajes.find({
            where: {
                empresa: req.allParams().id,
                modalidad: 'intermunicipal',
                fecha: limitFecha(req)
            },
            sort: 'fecha ASC'
        }).populate('conductor').populate('vehiculo').populate('empresa').then(datos => {
            datos.forEach(function (viaje) {
                viaje.conductor.fecha_licencia = moment(viaje.conductor.fecha_licencia).format('L');
                viaje.empresa.fecha_resolucion = moment(viaje.empresa.fecha_resolucion).locale("es").format('LL');
                viaje.f_contrato = {
                    dia: parseInt(moment(viaje.fecha).format('Do')),
                    mes: moment(viaje.fecha).locale('es').format('MMMM'),
                    ano: moment(viaje.fecha).format('YYYY')
                }
                viajes.push(viaje);
            })
            data = {
                template: {'shortid': 'S102cRpR'},
                data: viajes
            }
            var options = {
                method: 'POST',
                url: 'http://localhost:5488/api/report',
                headers: {
                    'content-Type': 'application/json',
                },
                json: data
            };
            request(options).pipe(res);
        })
    }
};

function limitFecha(req, default_dia) {
    var fecha_hasta = req.param('fecha_hasta') ? moment(req.param('fecha_hasta')) : moment();
    if (req.param('fecha_desde')) {
        var fecha_desde = moment(req.param('fecha_desde'));
    } else {
        default_dia || (default_dia = false);
        var fecha_desde = default_dia ? moment() : moment().date(1);
    }
    fecha_desde.set('hour', 0).set('minute', 0).set('second', 0);
    fecha_hasta.set('hour', 0).set('minute', 0).set('second', 0);
    fecha_desde.add(-1, 'd');
//   fecha_hasta.add(1, 'd');
    console.log(fecha_hasta.toDate(), '**************');
    console.log(fecha_desde.toDate(), '**************');
    return {
        '>=': fecha_desde.toDate(),
        '<': fecha_hasta.toDate()
    }
}