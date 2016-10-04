/**
 * Solicitudes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'redis',

  attributes: {
    estado:     {type:'string', size: '1'},
    direccion:  {type:'string', size: '50'},
    telefono:   {type:'string', size: '12'},
    pasajeros:  {type:'array', required: true},

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

