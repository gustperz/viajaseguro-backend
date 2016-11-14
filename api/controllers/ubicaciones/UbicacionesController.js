/**
 * Created by jose on 11/11/16.
 */
module.exports = {
    identity: 'Ubicaciones',

    joinWsUbicaciones(req, res){
        if(req.user.conductor){
            sails.sockets.join(req, 'conductor'+req.user.conductor.id+'watcher');
        }
        res.ok();
    },

    postUbicacionConductor(req, res){
        sails.sockets.join(req, 'conductor'+req.user.conductor.id+'watcher');
        sails.sockets.broadcast('conductor'+req.user.conductor.id+'watcher', 'posConductor', req.allParams(), req);
        res.ok();
    },
};

