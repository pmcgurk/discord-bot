const tableName = "users";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, function (t) {
    t.string('id').primary();
    t.integer('amount').defaultTo(0);
    t.string('name');
    t.boolean('admin').defaultTo(false);
    t.dateTime('createdAt').notNull().defaultsTo(knex.fn.now());
    t.dateTime('updatedAt').nullable();
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(tableName);
};
