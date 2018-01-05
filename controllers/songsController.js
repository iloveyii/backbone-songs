
var songs = [
        {
            'id':1,
            'title':'A lovely song',
            'author':'Some Lover',
            'artist':'Some Singer',
            'filename':'horse.ogg'
        },
        {
            'id':10,
            'title':'A lovely song',
            'author':'Some Lover',
            'artist':'Some Singer',
            'filename':'horse.ogg'
        },
        {
            'id':2,
            'title':'A romantic song',
            'author':'Some Romeo',
            'artist':'Some rummer',
            'filename':'horse.ogg'
        },
        {
            'id':3,
            'title':'A pop song',
            'author':'Some Poper',
            'artist':'Some pop band',
            'filename':'horse.ogg'
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

    app.put('/api/songs', function (req, res) {
        var index = songs.findIndex(function (song) {
            console.log('inside find idex');
            return song.id === req.body.id;
        });
        if(index >= 0) {
            songs[index] = req.body;
        }

        res.json(songs);
        res.end();
    });

    app.delete('/api/songs/:id', urlEncodedParser, function (req, res) {
        songs = songs.filter(function (song) {
            return song.id !== parseInt(req.params.id);
        });
        res.json(songs);
        res.end();
    });

}