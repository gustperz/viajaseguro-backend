/**
 * Created by Jose Soto Acosta on 11/09/2016.
 */
/**
 * Route Mappings
 */
module.exports.routes = {
    'POST /clientes' :{
        controller: 'Clientes',
        action: 'create',

        swagger: {
            methods: ['POST'],
            summary: 'Guardado de un cliente',
            responses: {
                201: {
                    schema: 'Clientes'
                }
            },
        }
    },

    'GET /clientes/:id': {
        controller: 'Clientes',
        action: 'find',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene un cliente por la identificacion',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'PUT /clientes/:id': {
        controller: 'Clientes',
        action: 'update',

        swagger: {
            methods: ['GET'],
            summary: 'Actualiza un cliente',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'DELETE /clientes/:id':{
        controller: 'Conductores',
        action: 'destroy',

        swagger: {
            methods: ['DELETE'],
            summary: 'Elimina un cliente',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    }

}
