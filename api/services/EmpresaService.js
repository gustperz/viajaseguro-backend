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
        data.user.rol = 'EMPRESA';
        Empresas.create(data)
            .then(function (empresa) {
                next(null, empresa)
            })
            .catch(error => {
                if (!error.invalidAttributes.username && data.user.username) {
                    User.destroy({username: data.user.username}).exec(() => {
                    });
                }
                next(error);
            })
    },
    updateEmpresa: function (params, next) {
        var data = params;
        Empresas.update({id: data.id}, data)
            .then(function (empresa) {
                next(null, empresa)
            })
            .catch(next)
    },
    removeEmpresa: function (id, next) {
        Empresas.destroy({id: id})
            .then(function (empresa) {
                next(null, empresa)
            })
            .catch(next)
    }

}
