/**
 * Created by Jose Soto Acosta on 11/09/2016.
 */
/**
 * Route Mappings
 */
module.exports.routes = {
    'GET /clientes/:id': {
        controller: 'Clientes',
        action: 'findOne',

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

    'POST /clientes':{
        controller: 'Clientes',
        action: 'create',

        swagger: {
            methods: ['POST'],
            summary: 'registrar cliente',
            responses: {
                201: {
                    description: 'OK'
                }
            }
        }
    },

    'POST /clientes/:id/solicitud':{
        controller: 'Clientes',
        action: 'createSolicitud',

        swagger: {
            methods: ['POST'],
            summary: 'enviar solicitud clente',
            responses: {
                201: {
                    description: 'OK'
                }
            }
        }
    },

    'GET /clientes/:id/solicitud': {
        controller: 'Clientes',
        action: 'findLastSolicitud',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene la solucitud activa del cliente',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

}
