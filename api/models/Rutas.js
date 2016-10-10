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
    },

    toJSON() {
      var obj = this.toObject();
      delete obj.origen.address_components_raw;
      delete obj.destino.address_components_raw;
      return obj;
    }

  }
};