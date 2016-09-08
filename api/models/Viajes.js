/**
 * Viajes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    fecha:    {type: 'datetime', required: true},
    trayecto: {type: 'mediumtext'},

    ruta: {
      model: 'rutas'
    },

    // conductor: {
    //   model: 'conductores'
    // },

    // vehiculo: {
    //   model: 'vehiculos'
    // },

    origen: {
      model: 'municipios'
    },

    destino: {
      model: 'municipios'
    },

    clientes: {
      collection: 'clientes',
      through: 'pasajerosviaje'
    }
  }
};

