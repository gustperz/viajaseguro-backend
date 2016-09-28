/**
 * Created by tav0 on 27/09/16.
 */

module.exports = {

    autoPK: false,

    attributes: {
        pos: {type: 'integer'},

        ruta: {
            model: 'rutas'
        },

        conductor: {
            model: 'conductores'
        },

        toJSON() {
            var obj = this.toObject();
            delete obj.ruta;
            return obj;
        }

    }
};