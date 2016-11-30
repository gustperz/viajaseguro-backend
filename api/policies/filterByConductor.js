/**
 * Created by jose on 31/10/16.
 */

module.exports = function (req, res, next) {

    req.options.where = req.options.where || {};

    const user = req.user;

    if (user.rol === 'CONDUCTOR') {
        if(req.options.model === 'conductores') return next();
        const filter = user.rol === 'CONDUCTOR' ? {user: user.id} : {despachador: user.id};
        Conductores.findOne(filter, {select: ['id']})
            .then((conductor) => {
                if(!conductor) return res.badRequest('no se encuentra el conductor de este usuario');
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
    else {
        return res.unauthorized('no tienes permiso de hacer esta peticion');
    }
}
