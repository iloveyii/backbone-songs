
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
var urlEncodedParser = bodyParser.urlencoded({extended:false});

module.exports = function (app) {

    // fix in body from backbone model post
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());

    app.get('/api/songs', function (req, res) {
        res.set('Content-Type', 'application/json');
        res.send(songs);
        res.end();
    });

    app.post('/api/songs', function (req, res) {
        var song = req.body;
        song.id = songs.length + 1;
        console.log(song);
        res.set('Content-Type', 'application/json');
        songs.push(song);

        res.json(songs);
        res.end();
    });

    app.put('/api/songs/:song', urlEncodedParser, function (req, res) {

    });

    app.delete('/api/songs/:song', function (req, res) {

    });

}