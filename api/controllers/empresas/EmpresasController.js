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
    getEmpresa: function (req, res) {
        var id = req.allParams().id;
        if (!id) return res.badRequest('No envio el id de la empresa');
        EmpresaService.getEmpresa(req.allParams().id, function (err, empresa) {
            if (err) return res.negotiate(err)
            return res.ok(empresa)
        })
    },
    addEmpresa: function (req, res) {
        var params = req.allParams();
        if (!params.user) return res.badRequest('Espera, aun no envias la información de acceso de la empresa.');
        EmpresaService.addEmpresa(params, function (err, empresa) {
            if (err) return res.negotiate(err)
            return res.ok(empresa)
        })
    },
    updateEmpresa: function (req, res) {
        var params = req.allParams();
        EmpresaService.updateEmpresa(params, function (err, empresa) {
            if (err) return res.negotiate(err)
            return res.ok(empresa)
        })
    },
    removeEmpresa: function (req, res) {
        var id = req.allParams().id;
        if (!id) return res.badRequest('No se envio ningun id para eliminar');
        EmpresaService.removeEmpresa(id, function (err, empresa) {
            if (err) return res.negotiate(err)
            return res.ok(empresa)
        });
    }
};
