const express = require('express')
const bodyParser = require('body-parser')
const store = require('./store')
const cors = require('cors')
const app = express()
const axios = require('axios');
const moment = require('moment');

const heroes = ['Abathur', 'Alarak', "Anub'arak", 'Artanis', 'Arthas', 'Auriel', 'Azmodan', 'Brightwing', 'Cassia', 'Chen', 'Cho', 'Chromie', 'D.Va', 'Dehaka', 'Diablo', 'E.T.C.', 'Falstad', 'Gall', 'Garrosh', 'Gazlowe', 'Genji', 'Greymane', "Gul'dan", 'Illidan', 'Jaina', 'Johanna', "Kael'thas", 'Kerrigan', 'Kharazim', 'Leoric', 'Li Li', 'Li-Ming', 'Lúcio', 'Lunara', 'Malfurion', 'Malthael', 'Medivh', 'Muradin', 'Murky', 'Nazeebo', 'Nova', 'Probius', 'Ragnaros', 'Raynor', 'Rehgar', 'Rexxar', 'Samuro', 'Sgt. Hammer', 'Sonya', 'Stitches', 'Stukov', 'Sylvanas', 'Tassadar', 'The Butcher', 'The Lost Vikings', 'Thrall', 'Tracer', 'Tychus', 'Tyrael', 'Tyrande', 'Uther', 'Valeera', 'Valla', 'Varian', 'Xul', 'Zagara', 'Zarya', 'Zeratul', "Zul'jin", ];
const gameModes = ['QuickMatch', 'TeamLeague', 'HeroLeague'];


app.use(cors())
app.use(bodyParser())
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
        let heroesStats = [];
        let gameStats = [];
        let day = req.body.params.day
        let endDay = moment(day).add(1, 'days').format('YYYY-MM-DD hh:mm:ss')
        let counter = 0;
        let more = false;
        axios.get('http://hotsapi.net/api/v1/replays', {
            params: {   
                start_date: day,
                end_date: endDay
            }
        })
        .then(function (response) {
            if (response.data.length >= 1) {
                console.log(response.data.length);
                heroesStats.push(response.data);
                if (response.data.length = 100) {
                  counter = response.data[response.data.length-1].id;
                } else {
                    counter = 0;
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        if(counter > 0){
            axios.get('http://hotsapi.net/api/v1/replays', {
                params: {
                    start_date: day,
                    end_date: endDay,
                    min_id: counter
                }
            })
            .then(function (response) {
                if (response.data.length >= 1) {
                    heroesStats.push(response.data);
                    if (response.data.length = 100) {
                    counter = response.data[response.data.length-1].id;  
                    } else {
                        counter = 0;
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        // console.log(heroesStats);
        
        
})
//rewrite functionally
// putinDb = () => {
//     for(game in heroesStats) {
//            axios.get(`http://hotsapi.net/api/v1/replays/${game.id}`)
//             .then(function (response) {
//                 gameStats.push(response.data);
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//         }

//         for (hero in heroes){
//             let current = gameStats.filter((n) => n.players.hero == hero);
//             for (gameMode in gameModes){
//                 let modeGames = current.filter((o) => o.game_type == gameMode);
//                 let gameCounter = 0;
//                 let winCounter = 0;
//                 for (game in modeGames) {
//                     gameCounter++;
//                     let onlyHero = game.players.filter((p) => p.hero == hero);
//                     if (onlyHero.winner == true) {
//                         winCounter++;
//                     }
//                 }
//                 store
//                 .createHeroDailyStat({
//                     hero: hero,
//                     date: day,
//                     wins: winCounter,
//                     games: gameCounter,
//                     gameType: gameMode,
//                     winRate: ((winCounter)/(gameCounter))
//                 })
//             }
            
//         }

// }

app.listen(3002, () => console.log('Server running on port 3000'))