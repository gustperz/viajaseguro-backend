/**
 * EmpresasController
 *
 * @description :: Server-side logic for managing Empresas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const _ = require('lodash');

module.exports = {
    identity: 'Empresas',

    create(req, res, next) {
        console.log('aca entro')
        const data = req.allParams();
        const mc = data.modulos_contratados_empresa;
        if (!data.user) return res.badRequest('Espera, aun no envias la información de acceso de la empresa.');
        data.user.rol = 'EMPRESA';
        Empresas.create(data, function(err, empresa) {
            console.log(empresa)
            if (err) return next(err);

            res.status(201);

            res.json(empresa);

        });
        // Empresas.create(data)
        //     .done(function (err, empresa) {
        //         console.log(empresa)
        //         // Error handling
        //         if (err) {
        //
        //             res.send("Error:Sorry!Something went Wrong");
        //
        //         } else {
        //             res.send("Successfully Created!");
        //             //res.redirect( 'person/view/’+model.id);
        //
        //         }
        //
        //     });

    },

    // create: function (req, res) {
    //
    //     if (req.method == "POST" && req.param("Person", null) != null) {
    //         Person.create(req.param("Person")).done(function (err, model) {
    //
    //             // Error handling
    //             if (err) {
    //
    //                 res.send("Error:Sorry!Something went Wrong");
    //
    //             } else {
    //                 res.send("Successfully Created!");
    //                 //res.redirect( 'person/view/’+model.id);
    //
    //             }
    //
    //         });
    //
    //     } else {
    //         res.render("person/create");
    //     }
    // }
};
