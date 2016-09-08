/**
 * Rutas.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre_ciudad: {type: 'string', size: 100},
    trayecto:      {type: 'array'},
    tarifa:        {type: 'float'},

    origen: {
      model: 'centrales'
    },

    destino: {
      model: 'centrales'
    }

  }
};

