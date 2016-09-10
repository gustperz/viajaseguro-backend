/**
 * Route Mappings
 */

module.exports.routes = {

    'POST /empresas': {
        controller: 'empresa/Empresas',
        action: 'create',

        swagger: {
            methods: ['POST'],
            summary: 'Guardado de empresa',
            responses: {
                200: {
                    description: 'OK',
                }
            },
            parameters: [{
                in: 'body',
                name: 'Datos de Guardado',
                description: 'Guarda una empresa',
                required: true
            }]
        }
    }
}
