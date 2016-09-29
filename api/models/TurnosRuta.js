/**
 * Created by tav0 on 27/09/16.
 */

module.exports = {

    attributes: {
        pos: {type: 'integer'},

        ruta: {
            model: 'rutas'
        },

        conductor: {
            model: 'conductores'
        }

    }
};