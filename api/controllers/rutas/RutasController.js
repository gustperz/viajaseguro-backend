/**
 * Created by tav0 on 22/09/16.
 */
const _ = require('lodash');

module.exports = {
    identity: 'Rutas',

    updateTurnos(req, res) {
        Rutas.find(req.params.id, {select : ['destino']}).then(_ruta => {
            const ruta = _ruta[0];
            async.series([
                cb => TurnosRuta.destroy({ruta: ruta.id}).exec(cb),
                cb => async.each(req.allParams().turnos, deleteOrCreate, cb)
            ], (error, result) => {
                if(error) return res.negotiate(error);

                TurnosRuta.broadcastChange(ruta.id);
                return res.ok()
            });

            function deleteOrCreate(turno, cb){
                if(turno.pos == -1) {
                    sails.sockets.broadcast('conductor' + turno.conductor + 'watcher', 'removedTurno');
                    sails.log.silly('broadcast conductor' + turno.conductor + 'watcher:removedTurno');
                    Conductores.updateEstado(turno.conductor, 'disponible');
                    return cb()
                } else {
                    TurnosRuta.create({
                        id: turno.conductor,
                        pos: turno.pos,
                        conductor: turno.conductor,
                        ruta: ruta.id
                    }).then(() => {
                        sails.sockets.broadcast('conductor' + turno.conductor + 'watcher', 'turnoUpdate', {pos: turno.pos, ruta: ruta.destino.ciudad});
                        sails.log.silly('broadcast conductor' + turno.conductor + 'watcher:turnoUpdate');
                        if(turno.isNew) Conductores.updateEstado(turno.conductor, 'en_turno');
                        return cb();
                    }).catch(cb);
                }
            }
        });
    },

    populateTurnos(req, res) {
        // if (!req.isSocket) return res.badRequest();
        const ruta_id = req.params.id;
        TurnosRuta.find({ruta: ruta_id}).populate('conductor')
            .then(turnos => {
                sails.sockets.join(req, 'turnosRutawatcher');
                res.ok(turnos);
            })
            .catch(res.negotiate);
    }

};