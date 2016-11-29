/**
 * Created by tav0 on 12/09/16.
 */

module.exports = function (req, res, next) {

    req.options.where = req.options.where || {};

    const user = req.user;

    if (user.rol === 'CENTRAL_EMPRESA' || user.rol === 'DESPACHADOR_EMPRESA' || user.rol === 'EMPRESA') {
        if(req.options.model === 'centrales') return next();
        const filter = user.rol === 'CENTRAL_EMPRESA' ? {user: user.id} : {despachador: user.id};
        Centrales.findOne(filter, {select: ['id']})
            .then((central) => {
                if(!central) return res.badRequest('no se encuentra la central de este usuario');
                req.options.where.central = central.id;
                req.user.central = {
                    id: central.id
                };
                req.user.empresa = {
                    id: central.empresa,
                    especial: central.empresa.especial,
                    intermunicipal: central.empresa.intermunicipal
                };
                next();
            }).catch(res.negotiate);
    }
    else if (user.rol === 'EMPRESA') {
        if(req.options.model === 'viajes') return next();
        return res.unauthorized('no tienes permiso de hacer esta peticion');
    }
    else if (user.rol === 'CONDUCTOR') {
        if(req.options.model === 'solicitudes') return next();
        return res.unauthorized('no tienes permiso de hacer esta peticion');
    }
    else if (user.rol === 'CLIENTE') {
        if(req.options.model === 'rutas') return next();
        return res.unauthorized('no tienes permiso de hacer esta peticion');
    }
    else {
        return res.unauthorized('no tienes permiso de hacer esta peticion');
    }
}
