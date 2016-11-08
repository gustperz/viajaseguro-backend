/**
 * Created by Jose Soto Acosta on 11/09/2016.
 */
/**
 * ConductoresController
 *
 * @description :: Server-side logic for managing Conductores
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const actionUtil = require('../../blueprints/myActionUtil');
const _ = require('lodash');

module.exports = {
    identity: 'Conductores',

    create(req, res) {
        const data = req.allParams();
        data.empresa = req.user.empresa.id;
        data.vehiculo.empresa = req.user.empresa.id;
        data.codigo_vial = data.vehiculo.codigo_vial;

        if (!req.user.empresa.especial && req.user.empresa.intermunicipal) data.vehiculo.modalidad = 'intermunicipal';
        if (req.user.empresa.especial && !req.user.empresa.intermunicipal) data.vehiculo.modalidad = 'especial';

        data.user = {
            username: String(data.identificacion),
            password: String(data.identificacion),
            rol: 'CONDUCTOR',
            email: req.allParams().email || ''
        };
        Conductores.create(data)
            .then(res.ok)
            .catch(error => {
                if (!error.invalidAttributes.username && data.user.username) {
                    User.destroy({username: data.user.username}).exec(() => {
                    });
                }
                if (!error.invalidAttributes.placa && data.vehiculo.placa) {
                    Vehiculos.destroy({placa: data.vehiculo.placa}).exec(() => {
                    });
                }

                if (!error.invalidAttributes.codigo_vial && data.vehiculo.codigo_vial) {
                    Vehiculos.destroy({codigo_vial: data.vehiculo.codigo_vial}).exec(() => {
                    });
                }
                res.negotiate(error);
            });
    },

    find(req, res){

        if (req.param('fields')) {
            var fields = req.param('fields').replace(/ /g, '').split(',');

            // elimino de fields todas las que sena de vehiculo y las guardo en fields_vehiculo
            var fields_vehiculo = _.remove(fields, field => _.startsWith(field, 'vehiculo.'));

            //verifico que no este consultando una columna que no exista en conductores
            const dif = actionUtil.checkFields(fields, Conductores);
            if (dif.length) {
                return res.badRequest({'error': 'error in fields, [' + dif.toString() + ']'});
            }

            if (fields_vehiculo.length) {
                //elimino de las columnas de vehiculo el sufijo vehiculo.
                fields_vehiculo = _.map(fields_vehiculo, field => _.replace(field, 'vehiculo.', ''));

                //verifico que no este consultando una columna que no exista en vehiculos
                const dif = actionUtil.checkFields(fields_vehiculo, Vehiculos);
                if (dif.length) {
                    return res.badRequest({'error': 'error in fields, [' + dif.toString() + ']'});
                }

                var query = Conductores.find({select: fields}).populate('vehiculo');
            } else {
                var query = Conductores.find({select: fields});
            }

            query.where(actionUtil.parseCriteria(req))
                .limit(actionUtil.parseLimit(req))
                .skip(actionUtil.parseSkip(req))
                .sort(actionUtil.parseSort(req))
                .then((conductores) => {
                    _.forEach(conductores, function (condcutor) {
                        if (condcutor.vehiculo) {
                            condcutor.vehiculo = _.pick(condcutor.vehiculo, fields_vehiculo)
                        }
                    });
                    res.ok(conductores)
                }).catch(res.negotiate);


        } else {
            res.badRequest('El parametro fields es obligatorio para esta petición')
        }
    },

    findVehiculo(req, res){
        var data = req.allParams();

        Conductores.find({id: data.id}).populate('vehiculo').then(conductor => {
            return res.ok(conductor);
        })
    },

    saveImagen(req, res){
        Conductores.findOne({id : req.params.id})
            .then((conductor) => {
                if (conductor) {
                    console.log(conductor)
                    req.file('imagen').upload({
                            dirname: sails.config.appPath + '/public/images/conductores',
                            saveAs: function (__newFileStream, cb) {
                                cb(null, conductor.imagen || uid.sync(18) + conductor.id + '.' + _.last(__newFileStream.filename.split('.')));
                            }
                        },
                        (error, uploadedFiles) => {
                            if (error) return res.negotiate(error);
                            if (!uploadedFiles[0]) return res.badRequest('ha ocurrido un error inesperado al almacenar la imagen');
                            const filename = _.last(uploadedFiles[0].fd.split('/'));
                            conductor.imagen = filename;
                            conductor.save((err, s) => res.ok('files upload'));
                        }
                    );
                } else {
                    return res.notFound('El conductor no existe');
                }
            }).catch(res.negotiate);
    },

    updateEstado(req, res){
        const data = req.allParams();
        Conductores.findOne({id : req.params.id})
            .then((conductor) => {
                if(conductor){
                    if(data.estado !== conductor.estado){
                        Conductores.update(conductor.id, {estado : data.estado})
                            .then(function (de) {
                                conductor.estado = data.estado;
                                sails.sockets.broadcast('central'+conductor.central+'watcher', 'cambioEstado', conductor, req);
                                res.ok();
                            })
                            .catch(res.negotiate)
                    }
                }else{
                    return res.notFound('No se encontro al conductor.')
                }
            })
            .catch(res.negotiate)
    }
};
