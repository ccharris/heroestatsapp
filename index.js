const express = require('express')
const bodyParser = require('body-parser')
const store = require('./store')
const app = express()

app.use(bodyParser.json())
app.get('/getHeroDailyStat', (req, res) => {
  store
    .getHeroDailyStat({
      hero: req.body.hero,
      date: req.body.date,
      gameType: req.body.gameType
    })
    .then(() => res.sendStatus(200))
})
app.post('/createHeroDailyStat', (req, res) => {
  store
    .createHeroDailyStat({
      hero: hero,
      date: date,
      numWins: wins,
      numGames: games,
      gameType: gameType,
      winRate: winRate
    })
    .then(() => res.sendStatus(200))
})

app.listen(3001, () => console.log('Server running on port 3001'))