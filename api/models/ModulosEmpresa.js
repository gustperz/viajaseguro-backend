/**
 * ModulosEmpresa.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'modulos_contratados_empresas',

  autoPK: false,

  attributes: {
    empresa: {
      model: 'empresas'
    },
    modulo: {
      model: 'modulos'
    }
  }
};

