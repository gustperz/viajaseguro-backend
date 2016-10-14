/**
 * Created by tav0 on 12/09/16.
 */

module.exports = function (req, res, next) {

    req.options.where = req.options.where || {};

    const user = req.user;

    if (user.rol === 'CENTRAL_EMPRESA') {
        if(req.options.model === 'centrales') return next();
        Centrales.findOne({user: user.id}, {select: ['id']})
            .then((central) => {
                if(!central) return res.badRequest('no se encuentra la central de este usuario');
                req.options.where.empresa = central.empresa;
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
                    nresolucon: empresa.nresolucon,
                    fecha_resolucion: empresa.fecha_resolucion,
                    nombre_corto: empresa.nombre_corto,
                    nombre_largo: empresa.nombre_largo,
                    nit_especial: empresa.nit_especial,
                    nit_intermunicipal: empresa.nit_intermunicipal,
                    logo: empresa.logo,
                    telefono: empresa.telefono,
                    direccion: empresa.direccion,
                    fax: empresa.fax,
                    firma_digital: empresa.firma_digital,
                    pjuridica: empresa.pjuridica,
                    nombre_pjuridica: empresa.nombre_pjuridica
                };
                next();
            }).catch(res.negotiate);
    }
    else {
        return res.unauthorized('no tienes permiso de hacer esta peticion');
    }
}
