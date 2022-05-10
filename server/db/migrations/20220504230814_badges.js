// I think it would be more logical for the tables to be named:
// badges -> user_badges
// track_data -> tracks
// badge_data -> badges
// To put it another way, users, badges, tracks, ranks for unique records about
// those entities, and then track_data and badge_data to create relationships
exports.up = function (knex) {
  return knex.schema.createTable('badges', (table) => {
    table.increments('id')
    table.integer('user_id').references('users.id')
    table.integer('badge_id').references('badge_data.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('badges')
}
