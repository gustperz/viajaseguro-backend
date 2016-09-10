/**
 * EmpresasController
 *
 * @description :: Server-side logic for managing Centrales
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const _ = require('lodash');

module.exports = {
    _config: {
    model: 'empresas'
  },

  create(req, res) {
    var data = req.allParams();
    if(!data.usuario) return res.badRequest('informacion de acceso de la empresa no enviada');
    data.usuario.rol = 'EMPRESA'; 
    Empresas.create(data)
      .then(res.created)
      .catch(error =>{
        if(!error.invalidAttributes.username && data.usuario.username) {
          Usuario.destroy({username: data.usuario.username}).exec(() => {});
        }
        res.negotiate(error);
      });
  },

  updateEstado(req, res){
    if(!req.allParams().estado){
      return res.badRequest('y el campo estado?')
    }
    Empresas
      .update({id: req.params.id}, {activa: req.allParams().estado})
      .then(records => {
        if (!records[0]) return res.notFound();
        res.ok();
      }).catch(res.negotiate);
  },

  saveLogo(req, res){
    Empresas.findOne({id: req.params.id})
        .then((empresa) => {
          if(empresa){
            req.file('logo').upload({
                  dirname: sails.config.appPath + '/public/images/empresas',
                  saveAs: function (__newFileStream, cb) {
                    cb(null, empresa.logo || uid.sync(18) + empresa.id +'.'+ _.last(__newFileStream.filename.split('.')));
                  }
                },
                (error, uploadedFiles) => {
                  if (error) return res.negotiate(error);
                  if(!uploadedFiles[0]) return res.badRequest('ha ocurrido un error inesperado al almacenar la imagen');
                  const filename = _.last(uploadedFiles[0].fd.split('/'));
                  empresa.logo = filename;
                  empresa.save((err, s) => res.ok('Archivo subido'));
                }
            );
          } else {
            return res.notFound('la empresa no existe');
          }
        }).catch(res.negotiate);
  }

};

sails