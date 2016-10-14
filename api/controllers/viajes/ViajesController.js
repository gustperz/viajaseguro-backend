/**
 * Created by jose on 13/10/16.
 */
const _ = require('lodash');
var request = require('request');

module.exports ={
    identity: 'Viajes',

    generateFuec(req, res){
        var data = {
            template : {'shortid':'B144VRaR'},
            options:{
                preview: true,
                data: {
                    nombre: 'Jose Miguel soto'
                }
            }
        }
        var options ={
            uri: 'http://localhost:5488/api/report  ',
            method: 'POST',
            json: data
        }
        request(options).pipe(res);
    }


};
