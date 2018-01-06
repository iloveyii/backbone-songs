
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

var fs = require('fs');

var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended:false});

module.exports = function (app) {

    // fix in body from backbone model post
    app.use(bodyParser.json({limit:1024102420, type:'application/json'}));
    app.use(bodyParser.urlencoded());
    // app.use(bodyParser({limit: '50mb'}));


    app.get('/api/songs', function (req, res) {
        res.set('Content-Type', 'application/json');
        res.send(songs);
        res.end();
    });

    app.post('/api/songs', function (req, res) {
        
        var fileName = req.body.fileName;
        var fileData = req.body.fileData;
        console.log('Received file: ' + fileName);

        if( fileName )
        setTimeout(function () {
            //strip out all of the meta data
            var matches = fileData.match(/^data:.+\/(.+);base64,(.*)$/);
            var base64_data = matches[2];

            //decode the base64 data
            var buffer = new Buffer(base64_data, 'base64');
            console.log('Buffered');
            var path = __dirname + '/../assets/audio/';
            var filePath = fs.realpathSync(path) + '/' + fileName;
            fs.writeFile(filePath, buffer, function (err, stat) {
                if(err) {
                    console.log('Error occcured in saving file.');
                } else {
                    console.log('Wrote data to path: ' + filePath);
                }
            });

        }, 5000);

        console.log('out of settimeout');
        var song = {
            id : req.body.id,
            title: req.body.title,
            author: req.body.author,
            artist: req.body.artist,
            filename: fileName
        };
        song.id = songs.length + 1;
        // console.log(song);
        res.set('Content-Type', 'application/json');
        songs.push(song);

        res.json(songs);
        res.end();
    });

    app.put('/api/songs/:id', function (req, res) {
        var index = songs.findIndex(function (song) {
            console.log('inside find idex');
            return song.id === parseInt(req.params.id);
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