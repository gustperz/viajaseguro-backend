/**
 * Created by Jose Soto Acosta on 06/11/2016.
 */
/**
 * IncidenciasController
 *
 * @description :: Server-side logic for managing Incidencias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const _ = require('lodash');
const moment = require('moment');

module.exports = {
    identity: 'Incidencias',

    create(req, res) {
        const data = req.allParams();
        Conductores.findOne({id: data.id})
            .then((conductor) => {
                if (conductor) {
                    var incidencia = {
                        concepto        : data.concepto,
                        descripcion     : data.descripcion,
                        conductor       : conductor.id,
                        fecha_inicio    : data.fecha_inicio || moment().toDate(),
                        empresa         : conductor.empresa,
                        central         : conductor.central
                    };

                    var response = {
                        conductor: conductor,
                        incidencia: incidencia
                    }
                    Incidencias.create(incidencia)
                        .then((incidencia) => {
                            if (incidencia) {
                                sails.sockets.broadcast('central'+incidencia.central+'watcher', 'newIncidencia', response, req);
                                Conductores.update({id: incidencia.conductor}, {estado: incidencia.concepto})
                                    .then(res.ok)
                                    .catch(res.negotiate)
                            } else {
                                return res.notFound('No se pudo crear la incidencia')
                            }
                        })
                        .catch(res.negotiate)
                } else {
                    return res.notFound('Este conductor no existe')
                }
            });
    },
};
