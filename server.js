require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const validUrl = require('valid-url')

// Basic Configuration
const port = process.env.PORT || 3000;

const urlObj = {}

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', function(req, res) {
  if (validUrl.isUri(req.body.url)) {
    const key = Math.floor(Math.random()*100000000);
    while (key in urlObj) {
      key = Math.floor(Math.random()*100000000);
    }
    urlObj[key] = req.body.url;
    res.status(200).json({
      "original_url": req.body.url,
      "short_url": key
    });
  } else {
    res.status(400).json({error: 'Invalid URL'});
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
