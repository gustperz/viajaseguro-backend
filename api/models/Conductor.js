/**
 * Created by Jose Soto Acosta on 2/09/2016.
 */
/**
 * Conductor.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        cedula:             { type: 'string', required: true, unique: true },
        nombres:            { type: 'string', required: true, size: 50 },
        apellidos:          { type: 'string', required: true, size: 50 },
        imagen:             { type: 'string', required: false, size: 255 },
        telefono:           { type: 'string', required: true, size: 15 },
        fecha_nacimiento:   { type: 'date', required: true },
        direccion:          { type: 'date', required: true, size: 50},
        email:              { type: 'string', required: false, size: 30 },
        estado:             { type: 'string', defaultsTo: 'disponible'},
        activo:             { type: 'boolean', defaultsTo: true},
        
        // relaciones
        central: { 
            model: 'centrales'
        },
        
        ciudad: { 
            model: 'municipios'
        },

        vehiculo: {
            model: 'vehiculos'
        }

    },

    autoCreatedAt: true,
    autoUpdatedAt: true,
}
