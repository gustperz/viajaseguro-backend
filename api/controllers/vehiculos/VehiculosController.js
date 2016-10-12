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

};
