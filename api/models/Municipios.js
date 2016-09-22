/**
 * Ciudades.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  migrate: 'safe',

  autoPK: false,
  attributes: {
    codigo: {type: 'integer', required: true, primaryKey: true, unique: true, autoIncrement: false,},
    nombre: {type: 'string', required: true, size: 45},

    departamento: {
      model: 'departamentos'
    }
  }
};

