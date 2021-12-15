const table = 'phrases';

exports.up = function (knex) {
  return knex.schema.table(table, function (t) {
    t.dateTime('deletedAt');
  });
};

exports.down = function (knex) {
  return knex.schema.table(table, function (t) {
    t.dropColumn('deletedAt');
  });
};
