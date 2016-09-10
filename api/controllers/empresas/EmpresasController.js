/**
 * EmpresasController
 *
 * @description :: Server-side logic for managing Empresas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const _ = require('lodash');

module.exports = {

    getEmpresas: function (req, res) {
        EmpresaService.getEmpresas(function (empresas) {
            res.json(empresas);
        });
    },

    addEmpresa: function (req, res) {
        var params = (req.body.value) ? req.body.value : undefined;
        EmpresaService.addEmpresa(params, function (success) {
            res.json(success);
        });
    },

    removeEmpresa: function (req, res) {
        var params = (req.body.value) ? req.body.value : undefined;
        EmpresaService.removeEmpresa(params, function (success) {
            res.json(success);
        });
    }
};
