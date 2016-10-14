/**
 * ModulosEmpresa.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'pasajeros_viaje',

  autoPK: false,

  attributes: {
    id:{type: 'integer', autoIncrement: true},
    viaje: {
      model: 'viajes'
    },
    cliente: {
      model: 'clientes'
    }
  }
};

