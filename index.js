const express = require('express')
const app = express()
const axios = require('axios')
const heroprotocol = require('heroprotocoljs')

app.get('/', (req, res) => {
  axios.get("http://hotsapi.s3-website-eu-west-1.amazonaws.com/bedd6561-068f-f0d0-f261-482c4d5c2c50.StormReplay")
  .then(function (response) {
    console.log(response);
    const file = response;
    const details = heroprotocol.get(heroprotocol.DETAILS, file);
    console.log(details);

    res.send('hey!');
  })
  .catch(function (error) {
    console.log(error);
    res.send(error);
  });

  
})
app.listen(3000, () => console.log('Server running on port 3000'))