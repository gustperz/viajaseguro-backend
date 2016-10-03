/**
 * Solicitudes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'redis',

  attributes: {
    estado : {type:'string', size: '2'},

    //relaciones
    cliente: {
      model : 'clientes'
    },
    conductor:{
      model : 'conductores'
    },
    central: {
      model : 'centrales'
    }
  }
};

