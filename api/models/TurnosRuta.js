/**
 * Created by tav0 on 27/09/16.
 */
const pick = require('lodash').pick;

module.exports = {

    connection: 'redis',

    autoPK: false,

    attributes: {
        id: {type: 'integer', primaryKey: true, unique: true, autoIncrement: false },

        pos: {type: 'integer'},

        ruta: {
            model: 'rutas'
        },

        conductor: {
            model: 'conductores'
        },

        toJSON() {
            var obj = this.toObject();
            if(typeof obj.conductor == 'object'){
                obj.conductor = pick(obj.conductor, ['id', 'nombres', 'apellidos', 'imagen', 'codigo_vial', 'vehiculo', 'modalidad'])
            }
            return obj;
        }
    },

    autoCreatedAt: true,

    broadcastChange(ruta) {
        TurnosRuta.find({ruta: ruta}).populate('conductor').then(turnos => {
            sails.sockets.broadcast('turnosRutawatcher', 'turnosRuta'+ruta+'Changed',  turnos);
            sails.log.silly('broadcast turnosRutawatcher:turnosRuta'+ruta+'Changed' );
        });
    }
};