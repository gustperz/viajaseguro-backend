/**
 * Created by Jose Soto Acosta on 2/09/2016.
 */
/**
 * Conductores.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        identificacion:     { type: 'string', required: true, unique: true },
        nombres:            { type: 'string', required: true, size: 50 },
        apellidos:          { type: 'string', required: true, size: 50 },
        imagen:             { type: 'string', required: false, size: 255 },
        telefono:           { type: 'string', required: true, size: 15 },
        fecha_nacimiento:   { type: 'date', required: true },
        fecha_ingreso:       { type: 'date', required: true },
        direccion:          { type: 'string', required: true, size: 50},
        email:              { type: 'email', size: 40},
        nlicencia:          { type: 'string', required: true ,size: 20},
        tipo_licencia:      { type: 'string', required: true, size: 2},
        fecha_licencia:     { type: 'date', required: true },
        estado:             { type: 'string', defaultsTo: 'disponible'},
        activo:             { type: 'boolean', defaultsTo: true},
        codigo_vial:        { type: 'string'},
        estacion:           { type: 'string'},
        modalidad:          { type: 'string', size: 14},

        // relaciones
        central: {
            model: 'centrales'
        },

        empresa: {
            model: 'empresas'
        },

        vehiculo: {
            model: 'vehiculos'
        },

        user: {
            model: 'user'
        }

    },

    autoCreatedAt: true,
    autoUpdatedAt: true,

    updateEstado(id, estado) {
        this.update(id, {'estado': estado}).then(conductor => {

        }).catch(error => {sails.log.warn('update estado a conductor qe no existee')})
    },

    afterCreate(newlyInsertedRecord, next){
         async.parallel({
            central: cb => {
                Centrales.findOne(newlyInsertedRecord.central).exec(cb);
            },
             vehiculo: cb => {
                Vehiculos.findOne(newlyInsertedRecord.vehiculo).exec(cb);
            }
         }, (err, result) => {
             Conductores.update(
                 { id: newlyInsertedRecord.id },
                 { estacion: result.central.ciudad_place_id },
                 { modalidad: result.vehiculo.modalidad }
             ).exec(() => {});
         });
        next();
    },

    afterDestroy(destroyedRecords, next){
        for (var i = 0; i < destroyedRecords.length; i++) {
            User.destroy({id: destroyedRecords[i].user}).exec(() => {});
            Vehiculos.destroy({id: destroyedRecords[i].vehiculo}).exec(() => {});
        }
        next();
    },

    beforeUpdate(valuesToUpdate, next){
        if(valuesToUpdate.vehiculo){
            Vehiculos.findOne(valuesToUpdate.vehiculo).exec((error, vehiculo) => {
                if(vehiculo){
                    valuesToUpdate.modalidad = vehiculo.modalidad;
                }else {
                    sails.log.error('el vehiculo '+valuesToUpdate.vehiculo+' no existe')
                }
                next();
            });
        } else {
            next();
        }
    }
}
