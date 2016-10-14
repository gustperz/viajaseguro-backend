/**
 * Created by jose on 13/10/16.
 */
module.exports.routes = {
  'GET /generateFuec': {
      controller: 'Viajes',
      action: 'generateFuec',

      swagger: {
          methods: ['GET'],
          summary: 'Obtiene el formato fuec ',
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
