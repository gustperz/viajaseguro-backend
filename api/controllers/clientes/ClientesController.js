/**
 * Created by Jose Soto Acosta on 11/09/2016.
 */
/**
 * ClientesController
 *
 * @description :: Server-side logic for managing Conductores
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const _ = require('lodash');

module.exports = {
    identity: 'Clientes',

    create(req, res) {
        const data = req.allParams();
        data.user = {
            username: String(data.identificacion),
            password: String(data.identificacion),
            rol: 'CLIENTE',
            email: req.allParams().email || ''
        };
        Clientes.create(data)
            .then(res.ok)
            .catch(error => {
                if (!error.invalidAttributes.username && data.user.username) {
                    User.destroy({username: data.user.username}).exec(() => {});
                }
                res.negotiate(error);
            });
    },
};
