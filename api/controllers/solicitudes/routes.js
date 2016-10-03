/**
 * Created by jose on 28/09/16.
 */
module.exports.routes = {

    'GET /solicitudes': {
        controller: 'Solicitudes',
        action: 'find',

        swagger: {
            methods: ['GET'],
            summary: 'get solicitud por socket',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'POST /solicitudes': {
        controller: 'Solicitudes',
        action: 'create',

        swagger: {
            methods: ['POST'],
            summary: 'Envia una solicitud por socket',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'POST /solicitudes/:id/reject': {
        controller: 'Solicitudes',
        action: 'reject',

        swagger: {
            methods: ['POST'],
            summary: 'Rechaza una solicitud del cliente',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'POST /solicitudes/:id/cancel': {
        controller: 'Solicitudes',
        action: 'cancel',

        swagger: {
            methods: ['POST'],
            summary: 'Cancela una solicitud',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'PUT /solicitudes/:id/estado': {
        controller: 'Solicitudes',
        action: 'update',

        swagger: {
            methods: ['PUT'],
            summary: 'cambiar estado de una solicitude del cliente',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    }

};
