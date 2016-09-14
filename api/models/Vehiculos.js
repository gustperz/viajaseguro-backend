/**
 * Created by Jose Soto Acosta on 7/09/2016.
 */
/**
 * Vehiculos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
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
        imagen:                 { type: 'string', required: false, size: 255 },
        placa:                  { type: 'string', required: true, unique: true, size: 10 },
        modelo:                 { type: 'string', required: true, size: 30 },
        color:                  { type: 'string', required: true, size: 20 },
        cupos:                  { type: 'integer', required: true, size: 2 },
        codigo_vial:            { type: 'string', required: true, unique: true, size: 5 },
        // propietario
        cedula_propietario:     { type: 'string', required: true, size: 15 },
        nombre_propietario:     { type: 'string', required: true, size: 50 },
        telefono_propietario:   { type: 'integer', required: true, size: 15 },
        // documentation
        soat:                   { type: 'boolean', required: false},
        fecha_soat:             { type: 'date', required: true },
        tecnomecanica:          { type: 'boolean', required: false },
        fecha_tecnomecanica:    { type: 'date', required: true },
        tarjeta_propiedad:      { type: 'boolean', required: false }
    },

    autoCreatedAt: true,
    autoUpdatedAt: true,
}
