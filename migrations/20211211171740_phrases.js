const tableName = "phrases";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, function (t) {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    t.integer('amount');
    t.string('text');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(tableName);
};
