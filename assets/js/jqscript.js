var webSongs = {

    index: function (songs) {
        var indexSongs = songs.toJSON();
        console.log('webSongs got songs: ', indexSongs);
        var ul = $('ul#songs');


        ul.append(this.makeLi(indexSongs));
    },

    view: function (song) {

    },
    makeLi: function (songs) {
        var li = '';
        _.each(songs, function (song, i) {
            li += '<li id="'+i+'" class="songLi">' + song.title + '</li>';
        });
        return li;
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
        song.save({}, {
            success: function () {
                songs.add(song);
                $('ul#songs').empty();
                $('ul#songs').append(webSongs.makeLi(songs.toJSON()));
                console.log('New song added' + song);
            }, 
            error: function () {
                alert('Some error has occurred, please refresh the page.')
            }
        });
   });

   $('.songLi').on('click', function (e) {
        console.log(e.target.id);
   });

    var songsView = new SongsView();
});