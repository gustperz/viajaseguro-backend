/**
 * Route Mappings
 */

module.exports.routes = {
    'POST /vehiculos': {
        controller: 'Vehiculos',
        action: 'create',

        swagger: {
            methods: ['POST'],
            summary: 'Guardado de un vehiculo',
            responses: {
                201: {
                    schema: 'Vehiculos'
                }
            },
        }
    },
    'GET /vehiculos': {
        controller: 'Vehiculos',
        action: 'find',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene todos los vehiculos de una empresa',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'GET /vehiculos/:id': {
        controller: 'Vehiculos',
        action: 'findOne',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene un vehiculo',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'PUT /vehiculos/:id': {
        controller: 'Vehiculos',
        action: 'update',

        swagger: {
            methods: ['GET'],
            summary: 'Actualiza un vehiculo',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'DELETE /vehiculos/:id':{
        controller: 'Vehiculos',
        action: 'destroy',

        swagger: {
            methods: ['DELETE'],
            summary: 'Elimina un vehiculo',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },
    'POST /vehiculos/:id/imagen':{
        controller: 'Vehiculos',
        action: 'saveImagen',

        swagger: {
            methods: ['POST'],
            summary: 'Guarda la imagen del vehiculo',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },
}
