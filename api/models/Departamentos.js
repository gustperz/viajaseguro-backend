/**
 * Departamentos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  migrate: 'safe',

  autoPK: false,
  attributes: {
    id:     {type: 'integer', required: true, primaryKey: true, autoIncrement: false,},
    nombre: {type: 'string', required: true, size: 45},
    coigo:  {type: 'string', required: true, size: 3},

    ciudades: {
      collection: 'municipios',
      via: 'departamento'
    }
  }
};

