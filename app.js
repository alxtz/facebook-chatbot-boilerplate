const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const request = require('request');

app.use(bodyParser.json())

app.get('/', (req, res) => {
  console.log(req.query['hub.challenge'])
  console.log('body', req.body)
  res.send(req.query['hub.challenge'])
})

app.post('/', (req, res) => {
  console.log(req.body.entry[0].messaging[0])
  console.log(req.body.entry[0].messaging[0].sender.id)
  const USER_ID = req.body.entry[0].messaging[0].sender.id
  console.log('USER_ID', USER_ID, typeof USER_ID)
  console.log('body', req.body.entry[0].messaging[0].message.text)
  const url = 'https://graph.facebook.com/v2.6/me/messages?access_token='
  const payload = {
    uri: url,
    method: 'POST',
    json: {
      "messaging_type": "RESPONSE",
      "recipient": {
        "id": USER_ID
      },
      "message": {
        "text": "hello, world!"
      }
    }
  }
  request(payload, function (error, response, body) {
    console.log(error)
    console.log(body)
  });
  res.send('200 ok')
})

app.listen(8080, () => console.log('Example app listening on port 8080!'))