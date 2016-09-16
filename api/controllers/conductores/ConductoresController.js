/**
 * Created by Jose Soto Acosta on 11/09/2016.
 */
/**
 * ConductoresController
 *
 * @description :: Server-side logic for managing Conductores
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const actionUtil = require('../../blueprints/myActionUtil');
const _ = require('lodash');

module.exports = {
    identity: 'Conductores',

    create(req, res) {
        const data = req.allParams();
        data.empresa = req.user.empresa.id;
        data.user = {
            username: data.identificacion,
            password: data.identificacion,
            rol: 'CONDUCTOR',
            email: req.allParams().email || ''
        };
        Conductores.create(data)
            .then(res.ok)
            .catch(error => {
                res.negotiate(error);
            });
    },

    find(req, res){

        if (req.param('fields')) {
            var fields = req.param('fields').replace(/ /g, '').split(',');

            // elimino de fields todas las que sena de vehiculo y las guardo en fields_vehiculo
            var fields_vehiculo = _.remove(fields, field => _.startsWith(field, 'vehiculo.'));
            console.log(fields_vehiculo)
            console.log(fields)

            //verifico que no este consultando una columna que no exista en conductores
            const dif = actionUtil.checkFields(fields, Conductores);
            if (dif.length) {
                return res.badRequest({'error': 'error in fields, [' + dif.toString() + ']'});
            }

            if (fields_vehiculo.length) {
                //elimino de las columnas de vehiculo el sufijo vehiculo.
                fields_vehiculo = _.map(fields_vehiculo, field => _.replace(field, 'vehiculo.', ''));
                console.log(fields_vehiculo)

                //verifico que no este consultando una columna que no exista en vehiculos
                const dif = actionUtil.checkFields(fields_vehiculo, Vehiculos);
                if (dif.length) {
                    return res.badRequest({'error': 'error in fields, [' + dif.toString() + ']'});
                }

                var query = Conductores.find({select: fields}).populate('vehiculo');
            } else {
                var query = Conductores.find({select: fields});
            }

            query.where(actionUtil.parseCriteria(req))
                .limit(actionUtil.parseLimit(req))
                .skip(actionUtil.parseSkip(req))
                .sort(actionUtil.parseSort(req))
                .then((conductores) => {
                    _.forEach(conductores, function (condcutor) {
                        if (condcutor.vehiculo) {
                            condcutor.vehiculo = _.pick(condcutor.vehiculo, fields_vehiculo)
                        }
                    });
                    res.ok(conductores)
                }).catch(res.negotiate);


        } else {
            res.badRequest('El parametro fields es obligatorio para esta petición')
        }
    },

}
