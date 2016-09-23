/**
 * ModulosController
 *
 * @description :: Server-side logic for managing Modulos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const _ = require('lodash');

module.exports = {
    identity: 'Modulos',

    create(req, res) {
        var data = req.allParams();
        Modulos.create(data)
            .then(res.ok)
            .catch(error => {
                res.negotiate(error);
            })
    }
};
