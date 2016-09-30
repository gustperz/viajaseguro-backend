/**
 * Created by tav0 on 27/09/16.
 */

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
        }

    }
};