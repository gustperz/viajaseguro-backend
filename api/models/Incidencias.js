/**
 * Created by jose on 5/11/16.
 */
/**
 * Incidencias.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        concepto     :   { type: 'string', required: true},
        descripcion     :   { type: 'string', required: true},
        fecha_inicio    :   { type: 'date', required: true},
        fecha_final     :   { type: 'date', required: false},
        hora_inicio      :   { type: 'time', required: false},
        hora_final      :   { type: 'time', required: false},
        // relaciones
        conductor: {
            model: 'conductores'
        },
        empresa: {
            model: 'empresas'
        },
        central: {
            model: 'centrales'
        },
    }
};


