/**
 * Created by tav0 on 22/09/16.
 */
const _ = require('lodash');

module.exports = {
    identity: 'Rutas',

    updateTurnos(req, res) {
        const ruta_id = req.params.id;
        async.series([
            cb => TurnosRuta.destroy({ruta: ruta_id}).exec(cb),
            cb => async.each(req.allParams().turnos, deleteOrCreate, cb)
        ], (error, result) => {
            if(error) return res.negotiate(error);

            TurnosRuta.find({ruta: ruta_id}).populate('conductor')
                .then((turnos) => {
                    const data = _.map( turnos, turno => ({
                        id: turno.id,
                        pos: turno.pos,
                        conductor: _.pick(turno.conductor, ['id', 'nombres', 'apellidos', 'imagen', 'codigo_vial', 'vehiculo'])
                    }) );
                    sails.sockets.broadcast('turnosRutawatcher', 'turnosRuta' + ruta_id + 'Cahnged',  data);
                })
                .catch(res.negotiate);
            return res.ok()
        });

        function deleteOrCreate(turno, cb){
            console.log(turno)
            if(turno.pos == -1) {
                sails.sockets.broadcast('conductor' + turno.conductor + 'watcher', 'removedTurno');
                Conductores.updateEstado(turno.conductor, 'disponible');
                return cb()
            } else {
                TurnosRuta.create({
                    id: turno.conductor,
                    pos: turno.pos,
                    conductor: turno.conductor,
                    ruta: ruta_id
                }).then(() => {
                    sails.sockets.broadcast('conductor' + turno.conductor + 'watcher', 'turnoUpdate', {pos: turno.pos});
                    if(turno.isNew) Conductores.updateEstado(turno.conductor, 'en_turno');
                    return cb();
                });
            }
        }
    },

    populateTurnos(req, res) {
        if (!req.isSocket) return res.badRequest();
        const ruta_id = req.params.id;
        TurnosRuta.find({ruta: ruta_id}).populate('conductor')
            .then((turnos) => res.ok( _.map( turnos, make) ))
            .catch(res.negotiate);

        function make(turno) {
            sails.sockets.join(req, 'turnosRutawatcher');
            return {
                id: turno.id,
                pos: turno.pos,
                conductor: _.pick(turno.conductor, ['id', 'nombres', 'apellidos', 'imagen', 'codigo_vial', 'vehiculo'])
            }
        }
    }

};