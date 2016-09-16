/**
 * Created by tav0 on 12/09/16.
 */

module.exports = function (req, res, next) {

    req.options.where = req.options.where || {};

    const user = req.user;

    if (user.rol === 'CENTRAL_EMPRESA') {
        Centrales.find({user: user.id}, {select: ['id']})
            .then((centrales) => {
                if(!centrales[0]) return res.badRequest('no se encuentra la central de este usuario');
                req.options.where.central = centrales[0].id;
                next();
            }).catch(res.negotiate);
    }
    else if (user.rol === 'EMPRESA') {
        Empresas.find({user: user.id}, {select: ['id']})
            .then((empresas) => {
                if(!empresas[0]) return res.badRequest('no se encuentra la empresa de este usuario');
                req.options.where.empresa = empresas[0].id;
                req.user.empresa = {
                    id: empresas[0].id
                };
                next();
            }).catch(res.negotiate);
    }
    else {
        return res.unauthorized('no teien permiso de hacer esta peticion');
    }
}
