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
                if (!error.invalidAttributes.username && data.user.username) {
                    User.destroy({username: data.user.username}).exec(() => {});
                }
                res.negotiate(error);
            })
    },

    joinWS(req, res){
        if (!req.isSocket) return res.badRequest();
        sails.sockets.join(req, 'central'+req.params.id+'watcher');
        return res.ok();
    },
};

