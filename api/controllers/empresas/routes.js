/**
 * Route Mappings
 */

module.exports.routes = {

    'POST /empresas': {
        controller: 'empresas/Empresas',
        action: 'addEmpresa',

        swagger: {
            methods: ['POST'],
            summary: 'Guardado de empresa',
            tags: ['Empresas'],
            responses: {
                201: {
                    schema: 'Empresas'
                }
            },
            parameters: [{
                in: 'body',
                name: 'Datos de Guardado',
                description: 'Guarda una empresa',
                required: true,
                schema: {
                    type: 'object',
                    required: ['nit', 'nombre_corto', 'nombre_largo', 'direccion', 'telefono'],
                    properties: {
                        'nit': {type: 'string'},
                        'nombre_corto': {type: 'string'},
                        'nombre_largo': {type: 'string'},
                        'direccion': {type: 'string'},
                        'telefono': {type: 'string'}
                    }
                }
            }]
        }
    },

    'GET /empresas': {
        controller: 'empresas/Empresas',
        action: 'getEmpresas',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene todas las empresas',
            tags: ['Empresas'],
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'GET /empresas/:id':{
        controller: 'empresas/Empresas',
        action: 'getEmpresa',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene una empresa',
            tags: ['Empresas'],
            responses : {
                200: {
                    description: 'OK'
                }
            }
        }
    }

}
