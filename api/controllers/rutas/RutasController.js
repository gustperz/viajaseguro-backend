/**
 * Created by tav0 on 22/09/16.
 */
const _ = require('lodash');

module.exports = {
    identity: 'Rutas',

    updateTurnos(req, res) {
        const ruta_id = req.params.id;
        TurnosRuta.destroy({ruta: ruta_id}).exec(err => {
            if (err) return res.negotiate(err);
            const turnos = req.allParams().turnos;
            _.forEach(turnos, function (turno) {
                if(turno.pos == -1) {
                    sails.sockets.broadcast('conductor' + turno.conductor + 'watcher', 'removedTurno');
                    Conductores.updateEstado(turno.conductor, 'disponible');
                } else {
                    TurnosRuta.create({
                        id: turno.conductor,
                        pos: turno.pos,
                        conductor: turno.conductor,
                        ruta: ruta_id
                    }).then(() => {
                        sails.sockets.broadcast('conductor' + turno.conductor + 'watcher', 'turnoUpdate', {pos: turno.pos});
                        if(turno.isNew) Conductores.updateEstado(turno.conductor, 'en_turno');
                    });
                }
            });
            return res.ok();
        });
    },

    populateTurnos(req, res) {
        const ruta_id = req.params.id;
        TurnosRuta.find({ruta: ruta_id}).populate('conductor')
            .then((turnos) => {
                return res.ok( _.map( turnos, turno => {
                    return {
                        id: turno.id,
                        pos: turno.pos,
                        conductor: _.pick(turno.conductor, ['id', 'nombres', 'apellidos', 'imagen', 'codigo_vial', 'vehiculo'])
                    }
                }) );
            }).catch(res.negotiate);
    }

};