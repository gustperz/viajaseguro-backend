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
            collapseKey: 'testing',
            priority: 'high',
            contentAvailable: true,
            delayWhileIdle: true,
            timeToLive: 3,
            dryRun: true,
            notification: {
                title: data.title,
                icon: "ic_launcher",
                body: data.body
            }
        });
        message.addData('title', 'New Message');
        message.addData('message', 'Hello this is a push notification');
        message.addData('sound', 'notification')
        sender.send(message, registrationTokens , 10, function (err, response) {
            if(err) console.error(err);
            else    console.log(response);
        });
    }

}
