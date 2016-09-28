/**
 * Created by tav0 on 22/09/16.
 */
const _ = require('lodash');

module.exports = {
    identity: 'Rutas',

    updateTurnos(req, res) {
        const ruta_id = req.params.id;
        TurnosRuta.destroy({ruta: ruta_id}).then(() => {
            const turnos = req.allParams();
            _.forEach(turnos, function (turno) {
                TurnosRuta.create({
                    pos: turno.pos,
                    conductor: turno.conductor,
                    ruta: ruta_id
                }).then(() => {
                    sails.sockets.broadcast('conductor'+turno.conductor+'watcher', 'turnoUpdate', {pos: turno.pos});
                });
            });
            return res.ok()
        }).catch(res.negotiate);
    },

    populateTurnos(req, res) {
        const ruta_id = req.params.id;
        TurnosRuta.find({ruta: ruta_id}).populate('conductor')
            .then((turnos) => {
                return res.ok( _.map( turnos, _.partialRight( _.pick, [
                    'identificacion',
                    'nombres',
                    'apellidos',
                    'imagen',
                    'codigo_vial_vehiculo'
                ] ) ) );
            }).catch(res.negotiate);
    }

};