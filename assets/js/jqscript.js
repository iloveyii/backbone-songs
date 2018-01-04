var webSongs = {

    index: function (songs) {
        var indexSongs = songs.toJSON();
        console.log('webSongs got songs: ', indexSongs);
        var ul = $('ul#songs');
        var li = '';
        _.each(indexSongs, function (song) {
            li += '<li>' + song.title + '</li>';
        });

        ul.append(li);
    },
    view: function (song) {

    }


};

$(document).ready(function () {
   var form = $('form');
   form.on('submit', function (e) {
       e.preventDefault();
        var title = $('#title').val();
        var author = $('#author').val();
        var artist = $('#artist').val();

        var data = {
            title : title,
            author: author,
            artist: artist
        };

        var song = new Song(data);
        song.save();
        songs.add(song);
        console.log(song);
   });
});