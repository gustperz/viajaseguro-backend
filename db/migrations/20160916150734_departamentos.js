const fs = require('fs');

exports.up = function (knex, Promise) {
    var sql = fs.readFileSync('db/migrations/departamentos.sql').toString();
    return Promise.all([
        knex.schema.dropTableIfExists('departamentos').then(() => {
            knex.schema.createTable('departamentos', function (t) {
                t.integer('id');
                t.string('nombre', 45);
                t.string('codigo', 3);
            }).then(() => {
                Promise.all([knex.schema.raw(sql)]);
            });
        })
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([])
};

exports.config = {
    transaction: false
};
