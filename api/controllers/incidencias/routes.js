/**
 * Created by Jose Soto Acosta on 11/09/2016.
 */
/**
 * Route Mappings
 */
module.exports.routes = {

    'POST /conductores/:id/reportar_incidencia': {
        controller: 'Incidencias',
        action: 'create',

        swagger: {
            methods: ['POST'],
            summary: 'reporta una incidencia',
            responses: {
                201: {
                    description: 'OK'
                }
            },
        }
    },

};
