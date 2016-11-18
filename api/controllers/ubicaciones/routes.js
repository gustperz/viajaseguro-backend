/**
 * Created by jose on 11/11/16.
 */
module.exports.routes = {

    'GET /join_ws_conductor': {
        controller: 'Ubicaciones',
        action: 'joinWsUbicaciones',

        swagger: {
            methods: ['GET'],
            summary: 'Crea la coneccion socket al conductor',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'POST /ubicacion_conductor': {
        controller: 'Ubicaciones',
        action: 'postUbicacionConductor',

        swagger: {
            methods: ['POST'],
            summary: 'Envia la ubicacion del conductor',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'GET /empresas/:id/join_ubicacion_conductores/:estacion': {
        controller: 'Ubicaciones',
        action: 'findUbicacionConductores',

        swagger: {
            methods: ['GET'],
            summary: 'JWT: ubicacion conductores estacion especificada',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },
};

