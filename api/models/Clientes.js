/**
 * Clientes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    identificacion: {type: 'string', primaryKey: true, autoIncrement: false, required: true, unique: true},
    nombre:         {type: 'string', required: true},
    telefono:       {type: 'string'},
    dieccion:       {type: 'string'}
  }

    // relaciones
    user: {
        model: 'user'
    },

    afterDestroy(destroyedRecords, next){
        for (var i = 0; i < destroyedRecords.length; i++) {
            User.destroy({id: destroyedRecords[i].user}).exec(() => {
            });
        }
        next();
    }
};

