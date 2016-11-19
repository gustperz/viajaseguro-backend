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
        const data = req.allParams();
        sails.sockets.join(req, 'empresa'+data.empresa+'ubicacionWhacher'+data.estacion);
        sails.sockets.broadcast('empresa'+data.empresa+'ubicacionWhacher'+data.estacion, 'posConductor', req.allParams(), req);
        sails.log.silly('broadcast empresa'+data.empresa+'ubicacionWhacher'+data.estacion+':posConductor');
        res.ok();
    },

    findUbicacionConductores(req, res) {
        sails.sockets.join(req, 'empresa'+req.allParams().id+'ubicacionWhacher'+req.allParams().estacion);
        res.ok();
    }
};

