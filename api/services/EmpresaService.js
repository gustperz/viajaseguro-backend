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

    getEmpresas: function (next) {
        Empresas.find().exec(function (err, empresas) {
            if (err) throw err;
            next(empresas);
        });
    },
    getEmpresa: function (id, next) {
        Empresas.findOne({id: id})
            .then(function (empresa) {
                next(null, empresa)
            })
            .catch(next)
    },
    addEmpresa: function (params, next) {
        var data = params;
        if (!data.usuario) return next.badRequest('Informacion de acceso de la empresa no enviada');
        data.usuario.rol = 'EMPRESA';
        Empresas.create(data)
            .then(function (empresa) {
                    next(null, empresa)
                })
            .catch(error => {
                if (!error.invalidAttributes.username && data.usuario.username) {
                    User.destroy({username: data.usuario.username}).exec(() => {
                    });
                }
                next(error);
            })
    },
    removeEmpresa: function (paramId, next) {
        Empresas.destroy({value: paramId}).exec(function (err, empresa) {
            if (err) throw err;
            next(empresa);
        });
    }

}
