const express = require('express')
const app = express()
const axios = require('axios')
const heroprotocol = require('heroprotocoljs')

app.get('/', (req, res) => {
  axios.get("http://hotsapi.s3-website-eu-west-1.amazonaws.com/b4f11f3f-618d-c202-ac45-6dac304920ce.StormReplay", {
      headers: {
         'x-amz-request-payer': 'requester'
      }
  })
  .then(function (response) {
    console.log(response);
    const file = response;
    const details = heroprotocol.get(heroprotocol.DETAILS, file);
    console.log(details);

    res.send(response);
  })
  .catch(function (error) {
    console.log(error);
    res.send(error);
  });

  
})
app.listen(3000, () => console.log('Server running on port 3001'))