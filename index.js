const express = require('express')
const bodyParser = require('body-parser')
const store = require('./store')
const app = express()

app.use(bodyParser.json())
app.get('/heroDailyStat', (req, res) => {
  store
    .getHeroDailyStat({
      hero: req.body.hero,
      date: req.body.date,
      gameType: req.body.gameType
    })
    .then((heroesStats) => {
      res.status(200).json(heroesStats);
    })
})
app.get('/getAllHeroesStats', (req, res) => {
  store
    .getAllHeroesStats()
    .then((heroesStats) => {
      res.status(200).json(heroesStats);
    })
})
app.post('/heroDailyStat', (req, res) => {
  store
    .createHeroDailyStat({
      hero: req.body.hero,
      date: req.body.date,
      wins: req.body.wins,
      games: req.body.games,
      gameType: req.body.gameType,
      winRate: req.body.winRate
    })
    .then((heroesStats) => {
      res.status(200).json(heroesStats);
    })
})

app.listen(3001, () => console.log('Server running on port 3000'))