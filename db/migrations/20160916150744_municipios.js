const fs = require('fs');

exports.up = function (knex, Promise) {
    var sql1 = fs.readFileSync('db/migrations/municipios1.sql').toString();
    var sql2 = fs.readFileSync('db/migrations/municipios2.sql').toString();
    var sql3 = fs.readFileSync('db/migrations/municipios3.sql').toString();
    return Promise.all([
        knex.schema.dropTableIfExists('municipios')
    ]).then(() => {
        return Promise.all([
            knex.schema.createTable('municipios', function (t) {
                t.integer('codigo');
                t.string('nombre', 45);
                t.integer('departamento');
            })
        ]).then(() => {
            return Promise.all([
                knex.schema.raw(sql1),
                knex.schema.raw(sql2),
                knex.schema.raw(sql3)
            ]);
        });
    });
};

exports.down = function (knex, Promise) {
    return Promise.all([])
};

exports.config = {
    transaction: false
};
