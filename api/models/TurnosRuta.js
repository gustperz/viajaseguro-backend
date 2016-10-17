/**
 * Created by tav0 on 27/09/16.
 */
const pick = require('lodash').pick;

module.exports = {

    connection: 'redis',

    autoPK: false,

    attributes: {
        id: {type: 'integer', primaryKey: true, unique: true },

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
                obj.conductor = pick(obj.conductor, ['id', 'nombres', 'apellidos', 'imagen', 'codigo_vial', 'vehiculo'])
            }
            return obj;
        }
    },

    broadcastChange(ruta) {
        TurnosRuta.find({ruta: ruta}).populate('conductor').then(turnos => {
            sails.sockets.broadcast('turnosRuta'+ruta+'watcher', 'turnosRuta'+ruta+'Changed',  turnos);
            sails.log.silly('broadcast turnosRuta'+ruta+'watcher:turnosRuta'+ruta+'Changed' );
        });
    }
};