
var songs = [
        {
            'id':1,
            'title':'A lovely song',
            'author':'Some Lover',
            'artist':'Some Singer'
        },
        {
            'id':10,
            'title':'A lovely song',
            'author':'Some Lover',
            'artist':'Some Singer'
        },
        {
            'id':2,
            'title':'A romantic song',
            'author':'Some Romeo',
            'artist':'Some rummer'
        },
        {
            'id':3,
            'title':'A pop song',
            'author':'Some Poper',
            'artist':'Some pop band'
        }
];

var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extend : false});

module.exports = function (app) {

    app.get('/api/songs', function (req, res) {
        res.set('Content-Type', 'application/json');
        res.send(songs);
        res.end();
    });

    app.post('/api/songs/:song', urlEncodedParser, function (req, res) {

    });

    app.put('/api/songs/:song', urlEncodedParser, function (req, res) {

    });

    app.delete('/api/songs/:song', function (req, res) {

    });

}