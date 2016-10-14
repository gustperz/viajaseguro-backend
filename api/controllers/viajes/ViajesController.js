/**
 * Created by jose on 13/10/16.
 */
const _ = require('lodash');
const http = require('http');
const jsreport = require('jsreport');
const fs = require('fs');

module.exports ={
    identity: 'Viajes',

    generateFuec(req, res){

        var html = fs.readFileSync('api/controllers/viajes/fuec_templ/fuec_tmpl.html').toString();
        require("jsreport").render({
            template: {
                content: html,
                recipe: "html"
            },
            data: { name: "jsreport" }
        }).then(function(out) {
            //pipes plain text with Hello world from jsreport
            out.stream.pipe(resp);
        });

    }


};
