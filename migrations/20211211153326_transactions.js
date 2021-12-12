const tableName = "transactions";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, function (t) {
    t.uuid('id').primary().defaultsTo(knex.raw('uuid_generate_v4()'));
    t.integer('amount');
    t.string('SenderId');
    t.foreign('SenderId').references('users.id');
    t.string('ReceiverId');
    t.foreign('ReceiverId').references('users.id');
    t.string('note');
    t.dateTime('createdAt').notNull().defaultsTo(knex.fn.now());
    t.dateTime('updatedAt').nullable();
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(tableName);
};
