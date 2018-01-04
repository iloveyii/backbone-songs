
var express = require('express');

var app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static('express'));

app.listen(3000);
console.log('Express is listening on port: 3000');