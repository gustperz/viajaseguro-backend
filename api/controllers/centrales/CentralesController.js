/**
 * Centrales/centralesController
 *
 * @description :: Server-side logic for managing centrales/centrales
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	identity: 'Centrales',

    create(req, res) {
        var data = req.allParams();
        if (!data.user) return res.badRequest('Espera, aun no envias la información de acceso de la central.');
        data.user.rol = 'CENTRAL_EMPRESA';
        data.empresa = req.user.empresa.id;
        Centrales.create(data)
            .then(res.ok)
            .catch(error => {
                if (!(error.invalidAttributes && error.invalidAttributes.username)) {
                    User.destroy({username: data.user.username}).exec(() => {});
                }
                res.negotiate(error);
            })
    },

    createDespachador(req, res) {
        var data = req.allParams();
        data.rol = 'DESPACHADOR_EMPRESA'
        User.create(data)
            .then(user =>{
                Centrales.update(req.params.parentId, {despachador: user.id}).then(()=>{
                    res.ok(user);
                }).catch(res.negotiate);
            }).catch(res.negotiate);
    },

    updateDespachador(req, res) {
        Centrales.findOne(req.params.parentId).then(central => {
            const data = req.allParams();
            const rol = data.activo ? 'DESPACHADOR_EMPRESA' : 'DESPACHADOR_EMPRESA_DES';
            const update = data.password
                ? User.update(central.despachador, {rol: rol, password: data.password})
                : User.update(central.despachador, {rol: rol});
            update.then(res.ok).catch(res.negotiate);
        }).catch(res.negotiate);
    },
};

