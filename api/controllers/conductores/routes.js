/**
 * Created by Jose Soto Acosta on 11/09/2016.
 */
/**
 * Route Mappings
 */
module.exports.routes = {

    'POST /conductores': {
        controller: 'Conductores',
        action: 'create',

        swagger: {
            methods: ['POST'],
            summary: 'Guardado de un conductor',
            responses: {
                201: {
                    schema: 'Conductores'
                }
            },
            parameters: [{
                in: 'body',
                name: 'Datos de Guardado',
                description: 'Guarda un conductor',
                required: true,
                schema: {
                    type: 'object',
                    required: ['identificacion', 'nombres', 'apellidos', 'direccion', 'telefono'],
                    properties: {
                        'identificacion': {type: 'string'},
                        'nombres': {type: 'string'},
                        'apellidos': {type: 'string'},
                        'direccion': {type: 'string'},
                        'telefono': {type: 'string'}
                    }
                }
            }]
        }
    },

    'GET /conductores': {
        controller: 'Conductores',
        action: 'find',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene todas los conductores de una empresa',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'GET /conductores/:id': {
        controller: 'Conductores',
        action: 'findOne',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene un conductor',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'PUT /conductores/:id': {
        controller: 'Conductores',
        action: 'update',

        swagger: {
            methods: ['GET'],
            summary: 'Actualiza un conductor',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'DELETE /conductores/:id':{
        controller: 'Conductores',
        action: 'destroy',

        swagger: {
            methods: ['DELETE'],
            summary: 'Elimina un conductor',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    }

}
