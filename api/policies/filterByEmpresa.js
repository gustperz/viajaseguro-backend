/**
 * Created by tav0 on 12/09/16.
 */

module.exports = function (req, res, next) {

    req.options.where = req.options.where || {};

    const user = req.user;

    if (user.rol === 'CENTRAL_EMPRESA'|| user.rol === 'DESPACHADOR_EMPRESA') {
        if(req.options.model === 'centrales') return next();
        const filter = user.rol === 'CENTRAL_EMPRESA' ? {user: user.id} : {despachador: user.id};
        Centrales.findOne(filter, {select: ['id']}).populate('empresa')
            .then((central) => {
                if(!central) return res.badRequest('no se encuentra la central de este usuario');
                req.options.where.empresa = central.empresa.id;
                req.user.central = {
                    id: central.id
                };
                req.user.empresa = {
                    id: central.empresa.id,
                    especial: central.empresa.especial,
                    intermunicipal: central.empresa.intermunicipal
                };
                next();
            }).catch(res.negotiate);
    }
    else if (user.rol === 'EMPRESA') {
        Empresas.findOne({user: user.id}, {select: ['id']})
            .then((empresa) => {
                if(!empresa) return res.badRequest('no se encuentra la empresa de este usuario');
                req.options.where.empresa = empresa.id;
                req.user.empresa = {
                    id: empresa.id,
                    especial: empresa.especial,
                    intermunicipal: empresa.intermunicipal
                };
                next();
            }).catch(res.negotiate);
    }
    else if (user.rol === 'CONDUCTOR') {
        if(req.options.model === 'conductores') return next();
        const filter = user.rol === 'CONDUCTOR' ? {user: user.id} : {despachador: user.id};
        Conductores.findOne(filter, {select: ['id']})
            .then((conductor) => {
                if(!conductor) return res.badRequest('no se encuentra la central de este usuario');
                req.options.where.empresa = conductor.empresa;
                req.user.conductor = {
                    id: conductor.id
                }
                req.user.empresa = {
                    id: empresa.id,
                };
                next();
            }).catch(res.negotiate);
    }
    else if (user.rol === 'CLIENTE') {
        if(req.options.model === 'centrales') return next();
        return res.unauthorized('no tienes permiso de hacer esta peticion');
    } else {
        return res.unauthorized('no tienes permiso de hacer esta peticion');
    }
}
