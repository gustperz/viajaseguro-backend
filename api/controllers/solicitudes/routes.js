/**
 * Created by jose on 28/09/16.
 */
module.exports.routes = {

    'POST /centrales/new_solicitud': {
        controller: 'Solicitudes',
        action: 'newSolicitud',

        swagger: {
            methods: ['GE'],
            summary: 'Envia una solicitud por socket',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },
};
