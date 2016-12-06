/**
 * Viajes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
const moment = require('moment');

module.exports = {

  attributes: {
    contrato: {type: 'string', size: 4},
    cont_dia: {type: 'string', size: 4},
    fuec:     {type: 'string', size: 21},
    fecha:    {type: 'string', defaultsTo: () => moment().format('YYYY-MM-DD') },
    trayecto: {type: 'mediumtext'},
    origen:   {type: 'string'},
    destino:  {type: 'string'},
    valor:    {type: 'float'},
    contratante_identificacion:  {type: 'string', size: 12},
    contratante_nombre:  {type: 'string', size: 150},
    modalidad: {type: 'string', size: 30},
    pasajeros:  {type:'array', required: true},

    ruta: {
      model: 'rutas'
    },

    conductor: {
      model: 'conductores'
    },

    vehiculo: {
      model: 'vehiculos'
    },

    empresa: {
      model: 'empresas'
    },

    central: {
      model: 'centrales'
    }
  },

  autoCreatedAt: true,
};

