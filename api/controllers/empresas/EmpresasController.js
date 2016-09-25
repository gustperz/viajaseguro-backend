/**
 * EmpresasController
 *
 * @description :: Server-side logic for managing Empresas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const _ = require('lodash');

module.exports = {
    identity: 'Empresas',

    create(req, res, next) {
        console.log('aca entro')
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
                    User.destroy({username: data.user.username}).exec(() => {});
                }
            })
    },
};
