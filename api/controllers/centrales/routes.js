/**
 * Created by Jose Soto Acosta on 11/09/2016.
 */
/**
 * Route Mappings
 */
module.exports.routes = {
    'GET /centrales': {
        controller: 'Centrales',
        action: 'find',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene todas las centrales',
            responses: {
                200: {
                    schema: 'centrales'
                }
            }
        }
    },

    'GET /centrales/:id': {
        controller: 'Centrales',
        action: 'findOne',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene todas las centrales',
            responses: {
                200: {
                    schema: 'centrales'
                }
            }
        }
    },

    'POST /centrales': {
        controller: 'Centrales',
        action: 'create',

        swagger: {
            methods: ['POST'],
            summary: 'Crear central',
            responses: {
                201: {
                    schema: 'centrales'
                }
            },
            parameters: [{
                in: 'body',
                name: 'Central',
                description: 'informacion central',
                required: true,
                schema: {
                    type: 'object',
                    required: ['identificacion', 'nombres', 'apellidos', 'direccion', 'telefono'],
                    properties: {
                        'direccion': {type: 'string'},
                        'telefono': {type: 'string'},
                        'pos_lat': {type: 'string'},
                        'pos_lng': {type: 'string'},
                        'ciudad': {type: 'int'},
                        'user': {
                            type: 'object',
                            properties: {
                                'username': {type: 'string'},
                                'password': {type: 'string'}
                            }
                        }
                    }
                }
            }]
        }
    },

    'GET /centrales/:parentId/rutas': {
        controller: 'Centrales',
        action: 'populate',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene las rutas de la central',
            responses: {
                200: {
                    schema: 'rutas'
                }
            }
        }
    },
    'POST /centrales/:parentId/rutas': {
        controller: 'Centrales',
        action: 'add',
        relarion: 'rutas',

        swagger: {
            methods: ['POST'],
            summary: 'Crear rutas central',
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
                    required: ['nombre_ciudad', 'trayecto', 'destino'],
                    properties: {
                        'nombre_ciudad': {type: 'string'},
                        'trayecto': {type: 'string'},
                        'destino': {type: 'string'}
                    }
                }
            }]
        }
    },

    'GET /socket/:parentId/join': {
        controller: 'Centrales',
        action: 'joinWS',

        swagger: {
            methods: ['GET'],
            summary: 'Logea en el socket',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },
}
