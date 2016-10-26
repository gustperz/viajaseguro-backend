/**
 * VehiculosController
 *
 * @description :: Server-side logic for managing Empresas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const _ = require('lodash');

module.exports = {
    identity: 'Vehiculos',
    create(req, res) {
        const data = req.allParams();
        data.empresa = req.user.empresa.id;

        if(!req.user.empresa.especial && req.user.empresa.intermunicipal) data.modalidad = 'intermunicipal';
        if(req.user.empresa.especial && !req.user.empresa.intermunicipal) data.modalidad = 'especial';

        Vehiculos.create(data)
            .then(res.ok)
            .catch(error => {
                if (!error.invalidAttributes.placa && data.placa) {
                    Vehiculos.destroy({placa: data.placa}).exec(() => {});
                }

                if (!error.invalidAttributes.codigo_vial && data.codigo_vial) {
                    Vehiculos.destroy({codigo_vial: data.codigo_vial}).exec(() => {});
                }
                res.negotiate(error);
            });
    },

    saveImagen(req, res){
        Vehiculos.findOne({id: req.allParams().id})
            .then((vehiculo) => {
                if (vehiculo) {
                    req.file('imagen').upload({
                            dirname: sails.config.appPath + '/public/images/conductores',
                            saveAs: function (__newFileStream, cb) {
                                cb(null, vehiculo.imagen || uid.sync(18) + vehiculo.id + '.' + _.last(__newFileStream.filename.split('.')));
                            }
                        },
                        (error, uploadedFiles) => {
                            if (error) return res.negotiate(error);
                            if (!uploadedFiles[0]) return res.badRequest('ha ocurrido un error inesperado al almacenar la imagen');
                            const filename = _.last(uploadedFiles[0].fd.split('/'));
                            vehiculo.imagen = filename;
                            vehiculo.save((err, s) => res.ok('files upload'));
                        }
                    );
                } else {
                    return res.notFound('El conductor no existe');
                }
            }).catch(res.negotiate);
    },

};
