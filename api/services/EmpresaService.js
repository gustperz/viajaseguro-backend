/**
 * Created by Jose Soto Acosta on 10/09/2016.
 */
/**
 * EmpresaService
 *
 * @description :: Server-side logic for managing Empresas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */
module.exports = {
    _config: {
        model: 'empresas'
    },

    getEmpresas: function(next) {
        Empresas.find().exec(function(err, empresas) {
            if(err) throw err;
            next(empresas);
        });
    },
    addEmpresa: function(todoVal, next) {
        Empresas.create({value: todoVal}).exec(function(err, empresas) {
            if(err) throw err;
            next(empresas);
        });
    },
    removeEmpresa: function(paramId, next) {
        Empresas.destroy({value: paramId}).exec(function(err, empresa) {
            if(err) throw err;
            next(empresa);
        });
    }
}
