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
        const data = req.allParams;
        sails.sockets.join(req, 'empresa'+data.empresa+'ubicacionwhacher'+data.estacion);
        sails.sockets.broadcast('empresa'+data.empresa+'ubicacionwhacher'+data.estacion, 'posConductor', req.allParams(), req);
        res.ok();
    },

    findUbicacionConductores(req, res) {
        sails.sockets.join(req, 'empresa'+req.allParams.id+'ubicacionwhacher'+req.allParams.estacion);
        res.ok();
    }
};

