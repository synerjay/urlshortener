require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const jsonify = {"original_url":null,"short_url":null};

app.post('/api/shorturl/new', urlencodedParser, function (req, res) {

if (req.body["url"].startsWith('http')){
  jsonify["original_url"] = req.body["url"];
  jsonify["short_url"] = (Math.round(Math.random() * 99));
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(jsonify));
} else {
  const error = { error: 'invalid url' };
  res.end(JSON.stringify(error));
}
})

app.get('/api/shorturl/:shorturl', function(req, res){
  
  if (jsonify["short_url"] == req.params.shorturl) {
    res.redirect(jsonify["original_url"])
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
