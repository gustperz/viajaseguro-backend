/**
 * Empresas.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        nit: {type: 'string', size: 15, required: true, unique: true},
        pjuridica: {type: 'string', size: 20},
        nombre_corto: {type: 'string', size: 25, required: true},
        nombre_largo: {type: 'string', size: 100},
        logo: {type: 'string', size: 255,},
        firma_digital:    {type: 'string', size: 255},
        direccion:        {type: 'string', size: 50},
        telefono:         {type: 'string', size: 15},
        nresolucon:       {type: 'string', size: 20},
        fecha_resolucion: {type: 'date'},
        tipo: {type: 'string', size: 11, required: true},
        activa: {type: 'boolean', defaultsTo: true},

        modulos: {
            collection: 'modulos',
            via: 'empresa',
            through: 'modulosempresa'
        },

        centrales: {
            collection: 'centrales',
            via: 'empresa'
        },

        conductores: {
            collection: 'conductores',
            via: 'empresa'
        },

        user: {
            model: 'user'
        },

        toJSON() {
            var obj = this.toObject();
            delete obj.user;
            delete  obj.firma_digital;
            return obj;
        }
    },

    autoCreatedAt: true
};
