/**
 * WebSocket Server Settings
 */

module.exports.sockets = {

  adapter: 'socket.io-redis',
  host: '127.0.0.1',
  port: 6379,
  pass: '',
  db: 'sails',

  grant3rdPartyCookie: true,

  beforeConnect(handshake, cb) {
    // `true` allows the connection
    return cb(null, true);

    // (`false` would reject the connection)
  },

  afterDisconnect(session, socket, cb) {
    // By default: do nothing.
    return cb();
  },

  transports: ["websocket"]

};
