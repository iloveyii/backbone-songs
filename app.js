
var express = require('express');
var fs = require('fs');
var songsController = require('./controllers/songsController');

var app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

// handle static pages here
app.get('/', function (req, res) {
    var index = fs.readFileSync('./index.html', 'utf8');
    res.set('Content-Type', 'text/html');
    res.send(index);
    res.end();
});

// handle api call here using controllers
songsController(app);

app.listen(3000);
console.log('Express is listening on port: 3000');