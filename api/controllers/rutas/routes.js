/**
 * Created by Jose Soto Acosta on 11/09/2016.
 */
/**
 * Route Mappings
 */
module.exports.routes = {

    'GET /rutas': {
        controller: 'Rutas',
        action: 'find',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene las rutas',
            responses: {
                200: {
                    schema: 'rutas'
                }
            }
        }
    },

    'POST /rutas': {
        controller: 'Rutas',
        action: 'create',

        swagger: {
            methods: ['POST'],
            summary: 'Crear rutas',
            responses: {
                201: {
                    schema: 'rutas'
                }
            },
            parameters: [{
                in: 'body',
                name: 'Ruta',
                description: 'informacion ruta',
                required: true,
                schema: {
                    type: 'object',
                    required: ['nombre_ciudad', 'trayecto', 'origen', 'destino'],
                    properties: {
                        'nombre_ciudad': {type: 'string'},
                        'trayecto': {type: 'string'},
                        'origen': {type: 'integer'},
                        'destino': {type: 'integer'}
                    }
                }
            }]
        }
    },

    'DELETE /rutas/:id': {
        controller: 'Rutas',
        action: 'destroy',

        swagger: {
            methods: ['DELETE'],
            summary: 'Elimirnar ruta',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'GET /rutas/:id/turnos': {
        controller: 'Rutas',
        action: 'populateTurnos',

        swagger: {
            methods: ['GET'],
            summary: 'obtiene los turnos de los conductores en cola',
            responses: {
                200: {
                    description: 'OK',
                    type: 'array'
                }
            }
        }
    },

    'POST /rutas/:id/turnos': {
        controller: 'Rutas',
        action: 'updateTurnos',

        swagger: {
            methods: ['POST'],
            summary: 'actualiza los turnos de los conductores en cola',
            responses: {
                201: {
                    description: 'OK'
                }
            }
        }
    },
}
