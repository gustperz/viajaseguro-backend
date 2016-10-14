/**
 * Created by jose on 13/10/16.
 */
module.exports.routes = {
    'GET /generateFuec': {
        controller: 'Viajes',
        action: 'generateFuec',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene el formato fuec ',
            responses: {
                200: {
                    description: 'OK'
                }
            },
        }
    },

    'GET /viajes': {
        controller: 'Viajes',
        action: 'find',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene los viajes',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }

    },

    'POST /viajes': {
        controller: 'Viajes',
        action: 'create',

        swagger: {
            methods: ['POST'],
            summary: 'Guardar un nuevo viaje (despachar conductor)',
            responses: {
                201: {
                    schema: 'Viajes'
                }
            },
            parameters: [{
                in: 'body',
                name: 'Datos de Guardado',
                description: 'Guarda un conductor',
                required: true,
                schema: {
                    type: 'object',
                    properties: {
                        'fecha': {type: 'string'},
                        'trayecto': {type: 'string'},
                        'origen': {type: 'string'},
                        'destino': {type: 'string'},
                        'ruta': {type: 'string'},
                        'conductor': {type: 'string'},
                        'vehiculo': {type: 'string'},
                        'clientes': {type: 'array'},
                    }
                }
            }]
        }
    },
};
