exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('heroesStats', function (t) {
    t.increments('id').primary()
    t.string('hero').notNullable()
    t.date('date').notNullable()
    t.integer('wins').notNullable()
    t.integer('games').notNullable()
    t.string('gameType').notNullable()
    t.decimal('winRate').notNullable()
    t.timestamps(false, true)
  })
}
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('heroesStats')
}