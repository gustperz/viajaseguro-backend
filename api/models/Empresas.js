/**
 * Empresas.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        nit_especial:       {type: 'string', size: 15, unique: true},
        nit_intermunicipal: {type: 'string', size: 15, unique: true},
        pjuridica:          {type: 'string', size: 20},
        nombre_pjuridica:   {type: 'string', size: 50},
        nombre_corto:       {type: 'string', size: 25, required: true},
        nombre_largo:       {type: 'string', size: 100},
        logo:               {type: 'string', size: 255,},
        firma_digital:      {type: 'string', size: 255},
        direccion:          {type: 'string', size: 50},
        telefono:           {type: 'string', size: 15},
        fax:                {type: 'string', size: 20},
        nresolucon:         {type: 'string', size: 20},
        ndireccion_terr:    {type: 'string', size: 3},
        fecha_resolucion:   {type: 'date'},
        especial:           {type: 'boolean', defaultsTo: false},
        intermunicipal:     {type: 'boolean', defaultsTo: false},
        activa:             {type: 'boolean', defaultsTo: true},

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
            return obj;
        }
    },

    autoCreatedAt: true,

    afterDestroy(destroyedRecords, next){
        for (var i = 0; i < destroyedRecords.length; i++) {
            User.destroy({id: destroyedRecords[i].user}).exec(() => {
            });
        }
        next();
    }
};
