/**
 * Centrales.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const pick = require('lodash').pick;

module.exports = {

    attributes: {
        ciudad:                 {type: 'string', size: 50},
        ciudad_place_id:        {type: 'string', size: 50},
        departamento:           {type: 'string', size: 50},
        place_id:               {type: 'string', size: 50},
        address_components_raw: {type: 'array'},
        direccion:              {type: 'string', size: 50},
        telefono:               {type: 'string', size: 15},
        pos_lat:                {type: 'string', size: 50},
        pos_lng:                {type: 'string', size: 50},

        rutas: {
            collection: 'rutas',
            via: 'central'
        },

        empresa: {
            model: 'empresas'
        },

        user: {
            model: 'user'
        },

        despachador: {
            model: 'user'
        },

        toJSON() {
            var obj = this.toObject();
            if(typeof obj.user == 'object'){
                obj.user = pick(obj.user, ['username', 'rol', 'id']);
            }
            return obj;
        }
    }
};

