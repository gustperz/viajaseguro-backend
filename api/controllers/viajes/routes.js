/**
 * Created by jose on 13/10/16.
 */
module.exports.routes = {
  'GET /viajes/:id/fuec': {
      controller: 'Viajes',
      action: 'findOneFuec',

      swagger: {
          methods: ['GET'],
          summary: 'Obtiene el formato fuec de un viaje',
          responses: {
              200: {
                  description: 'OK'
              }
          },
      }
  },

  'GET /viajes': {
      controller: 'Viajes',
      action: 'find',

      swagger:{
          methods: ['GET'],
          summary: 'Obtiene los viajes',
          responses:{
              200:{
                  description: 'OK'
              }
          }
      }

  }
};
