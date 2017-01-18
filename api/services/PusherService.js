/**
 * Created by jose on 5/11/16.
 */
"use strict";

const gcm = require('node-gcm');

module.exports = {
    send(data, tokens){
        var sender = new gcm.Sender('AIzaSyDTUQ3R3HShSm4L8UbtiUnTbFBWkXOW0HI');
        var registrationTokens = [];
        registrationTokens.push(tokens);
        var message = new gcm.Message({
            collapseKey: 'demo',
            priority: 'high',
            contentAvailable: true,
            delayWhileIdle: true,
            timeToLive: 3,
            data: {
                message: data.body,
                type: data.type ? data.type : null,
                pos: data.pos ? data.pos: null,
                ruta: data.ruta ? data.ruta: null
            },
            notification: {
                title: data.title,
                body: data.body
            }
        });
        sender.send(message, { registrationTokens: registrationTokens }, function (err, response) {
            if(err) console.error(err);
            else    console.log(response);
        });
    }

}