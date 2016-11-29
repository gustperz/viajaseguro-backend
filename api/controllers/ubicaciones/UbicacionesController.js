/**
 * Created by jose on 11/11/16.
 */
module.exports = {
    identity: 'Ubicaciones',

    joinWsUbicaciones(req, res){
        sails.sockets.join(req, 'conductor'+req.allParams().conductor_id+'watcher');
        res.ok();
    },

    postUbicacionConductor(req, res){
        const data = req.allParams();
        sails.sockets.join(req, 'empresa'+data.empresa+'tracking');
        sails.sockets.broadcast('empresa'+data.empresa+'tracking', 'posConductores'+data.estacion, req.allParams(), req);
        sails.log.silly('broadcast empresa'+data.empresa+'tracking'+':posConductores'+data.estacion);
        res.ok();
    },

    findUbicacionConductores(req, res) {
        sails.sockets.join(req, 'empresa'+req.allParams().id+'tracking');
        res.ok();
    }
};

