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

    'POST /centrales/reject_solicitud': {
        controller: 'Solicitudes',
        action: 'rejectSolicitud',

        swagger: {
            methods: ['POST'],
            summary: 'Rechaza una solicitude del cliente',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },
    'POST /centrales/accept_solicitud': {
        controller: 'Solicitudes',
        action: 'acceptSolicitud',

        swagger: {
            methods: ['POST'],
            summary: 'Acepta una solicitude del cliente',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    }

};
