/**
 * EmpresasController
 *
 * @description :: Server-side logic for managing Empresas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const _ = require('lodash');
const uid = require('uid-safe');
const fs = require('fs');

module.exports = {
    identity: 'Empresas',

    findByCiudad(req, res){
        const fields = ['nombre_corto', 'nombre_largo', 'logo', 'direccion', 'telefono', 'fax', 'especial', 'intermunicipal'];
        Empresas.find({select: fields})
            .populate('centrales', {where: {ciudad_place_id: req.param('ciudad')}})
            .then(empresas => {
                return res.ok(_.remove(empresas, empresa => empresa.centrales.length));
            }).catch(res.negotiate);
    },

    create(req, res) {
        const data = req.allParams();
        const mc = data.modulos_contratados_empresa;
        if (!data.user) return res.badRequest('Espera, aun no envias la información de acceso de la empresa.');
        data.user.rol = 'EMPRESA';
        Empresas.create(data)
            .then(function (empresa) {
                empresa.modulos.add(mc);
                empresa.save(function (err) {
                    res.ok(empresa);
                })
            })
            .catch(error => {
                if (!error.invalidAttributes.username && data.user.username) {
                    User.destroy({username: data.user.username}).exec(() => {
                    });
                }
            })
    },

    findConductores(req, res){
        console.log(req.allParams())
        Empresas.find({id: req.allParams().id}).populate('conductores').then(empresa => {
            console.log(empresa)
            return res.ok(empresa)
        })
    },

    saveLogo(req, res){
        Empresas.findOne({id: req.allParams().id})
            .then((empresa) => {
                if (empresa) {
                    if(empresa.logo)
                        fs.unlink(sails.config.appPath + '/public/images/empresas/'+empresa.logo);
                    req.file('logo').upload({
                            dirname: sails.config.appPath + '/public/images/empresas',
                            saveAs: function (__newFileStream, cb) {
                                cb(null, uid.sync(18) + empresa.id + '.' + _.last(__newFileStream.filename.split('.')));
                            }
                        },
                        (error, uploadedFiles) => {
                            if (error) return res.negotiate(error);
                            if (!uploadedFiles[0]) return res.badRequest('ha ocurrido un erro inesperado al almacenar la imagen');
                            const filename = _.last(uploadedFiles[0].fd.split('/'));
                            empresa.logo = filename;
                            empresa.save((err, s) => res.ok('files upload'));
                        }
                    );
                } else {
                    return res.notFound('la empresa no existe');
                }
            }).catch(res.negotiate);
    },

    saveFirma(req, res){
        Empresas.findOne({id: req.allParams().id})
            .then((empresa) => {
                if (empresa) {
                    if(empresa.firma_digital)
                        fs.unlink(sails.config.appPath + '/public/images/empresas/firma/'+empresa.firma_digital);
                    req.file('firmaDigital').upload({
                            dirname: sails.config.appPath + '/public/images/empresas/firma/',
                            saveAs: function (__newFileStream, cb) {
                                cb(null, uid.sync(18) + empresa.id + '.' + _.last(__newFileStream.filename.split('.')));
                            }
                        },
                        (error, uploadedFiles) => {
                            if (error) return res.negotiate(error);
                            if (!uploadedFiles[0]) return res.badRequest('ha ocurrido un erro inesperado al almacenar la imagen');
                            const filename = _.last(uploadedFiles[0].fd.split('/'));
                            empresa.firma_digital = filename;
                            empresa.save((err, s) => res.ok('files upload'));
                        }
                    );
                } else {
                    return res.notFound('la empresa no existe');
                }
            }).catch(res.negotiate);
    }
};
