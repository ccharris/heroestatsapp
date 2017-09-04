const express = require('express')
const app = express()
const axios = require('axios')
const heroprotocol = require('heroprotocoljs')

app.get('/', (req, res) => {
  axios.get("http://hotsapi.net/api/v1/replays/394795", {
      params: {
         'x-amz-request-payer': 'requester'
      }
  })
  .then(function (response) {
    console.log(response);
    const file = response.url;
    const details = heroprotocol.get(heroprotocol.DETAILS, file);
    console.log(details);

    res.send('hey!');
  })
  .catch(function (error) {
    console.log(error);
    res.send(error);
  });

  
})
app.listen(3000, () => console.log('Server running on port 3001'))