/**
 * Rutas.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    origen:    {type: 'json'},
    destino:   {type: 'json'},
    trayecto:  {type: 'text'},

    central: {
      model: 'centrales'
    },

    turnos: {
      collection: 'turnosruta',
      via: 'ruta'
    }

  }
};