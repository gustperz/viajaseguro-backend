/**
 * Connections
 */

module.exports.connections = {

  /***************************************************************************
  * Local disk storage for DEVELOPMENT ONLY                                  *
  ***************************************************************************/
  localDiskDb: {
    adapter: 'sails-disk'
  },

  /***************************************************************************
  * MySQL                                                                    *
  ***************************************************************************/
  // someMysqlServer: {
  //   adapter: 'sails-mysql',
  //   host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
  //   user: 'YOUR_MYSQL_USER', //optional
  //   password: 'YOUR_MYSQL_PASSWORD', //optional
  //   database: 'YOUR_MYSQL_DB' //optional
  // },


  /***************************************************************************
  * More adapters: https://github.com/balderdashy/sails                      *
  ***************************************************************************/

};
