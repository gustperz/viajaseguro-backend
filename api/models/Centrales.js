/**
 * Centrales.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    direccion: {type: 'string', size: 50},
    telefono:  {type: 'string', size: 15},
    pos_lat:   {type: 'string', size: 50},
    pos_lng:   {type: 'string', size: 50},

    rutas: {
      collection: 'rutas',
      via: 'origen'
    },

    empresa: {
      model: 'empresas'
    },

    ciudad: {
      model: 'municipios'
    },

    user: {
      model: 'user'
    },
  }
};

