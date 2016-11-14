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

    'POST /post_ubicacion_conductor': {
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
};

