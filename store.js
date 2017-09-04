const knex = require('knex')(require('./knexfile'))
module.exports = {
  getHeroDailyStat ({ hero, date, gameType }) {
    console.log(`Got ${hero} stats!`)
    return knex('heroesStats').where({
      hero: hero,
      date: date,
      gameType: gameType
    })
  },
  getAllHeroesStats () {
    console.log(`Got all heroes stats!`)
    return knex.select().table('heroesStats')
  },
  createHeroDailyStat ({ hero, date, wins, games, gameType, winRate }) {
    console.log(`Created ${hero} stats!`)
    return knex('heroesStats').insert({
      hero: hero,
      date: date,
      wins: wins,
      games: games,
      gameType: gameType,
      winRate: winRate
    })
  }
}