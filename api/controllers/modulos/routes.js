/**
 * Route Mappings
 */

module.exports.routes = {

    'POST /modulos': {
        controller: 'Modulos',
        action: 'create',

        swagger: {
            methods: ['POST'],
            summary: 'Guardado de un modulo',
            responses: {
                201: {
                    schema: 'Modulos'
                }
            }
        }
    },

    'GET /modulos': {
        controller: 'Modulos',
        action: 'find',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene todos los modulos',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'GET /modulos/:id': {
        controller: 'Modulos',
        action: 'findOne',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene un modulo',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'PUT /modulos/:id': {
        controller: 'Modulos',
        action: 'update',

        swagger: {
            methods: ['GET'],
            summary: 'Actualiza un modulo',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'DELETE /modulos/:id':{
        controller: 'Modulos',
        action: 'destroy',

        swagger: {
            methods: ['DELETE'],
            summary: 'Elimina un modulo',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    }
}
