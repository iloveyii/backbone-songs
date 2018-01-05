
// a sample model for easy validation
var Model = Backbone.Model.extend({

    checkValidation: function (attrs, rules) {
        for(var key in rules) {
            if( ! attrs[key]) {
                console.log('There is no attribute with key : ', key);
            }

            console.log('Key, Rule: ', attrs[key], rules[key]);
            console.log(this.applyRule(attrs[key], rules[key]));
            console.log('------------------------------------');
        }
    },
    applyRule: function (attr, rule) {

        console.log('Inside applyRule: ', attr, rule);

        switch(rule) {
            case 'integer':
                console.log('Applying rule integer on ', attr);
                return Number.isInteger(parseInt(attr)) ? attr + ' is an integer' : attr + ' is not an integer';
                break;
            case 'required':
                console.log('Applying rule required on ', attr);
                return attr ? attr + ' is defined' : attr + ' is not defined';
                break;
            case 'string':
                console.log('Applying rule string on ', attr);
                return typeof attr == 'string' ? attr + ' is string' : attr + ' is not string';
                break;
        }
    },
    commonMethod: function () {
        console.log('This is a common method from the parent.');
    }

});

var Song = Model.extend({

    url: '/api/songs',
    initialize: function () {
        console.log('A new song has been created.');
    },
    commonMethod: function () {
        Model.prototype.commonMethod();
        console.log('This is a common method from the child.');
    },

    validate: function (attrs) {

        var rules = {
            id: 'integer',
            artist: 'required',
            title: 'string'
        };

        this.checkValidation(attrs, rules);
    }
});

// with instantiating
var song = new Song({id: 2, title: 'Kan'});
// with set
song.set('name', 'My fav song');
// with set using object with multiple attributes
song.set({
    title : 'Jackson',
    artist: 'Michael'
});

// Collections
var Songs = Backbone.Collection.extend({
    model : Song,
    url: '/api/songs'
});

var songs = new Songs([
    new Song({title: 'Title 01'}),
    new Song({title: 'Title 02'}),
    new Song({title: 'Title 03'}),
    new Song({title: 'Title 04'})
]);

// Fetching collections
songs.fetch({
    success: function (resp) {
        console.log('Fetching songs success.');
        webSongs.index(songs);
    },
    error: function () {
        console.log('Error in fetching songs.');
    }
});

// View for one model
var SongView = Backbone.View.extend({
    model: new Song(),
    tagName: 'tr',
    initialize: function () {
        this.template = _.template($('.song-item-template').html());
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});


// View for all models
var SongsView = Backbone.View.extend({
    model : songs,
    el: $('.song-index'), // tbody
    initialize: function () {
        console.log('Inside songs view' + songs.toArray());
        this.model.on('add', this.render, this);
    },
    render: function () {
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function (sng) {
            self.$el.append((new SongView({model:sng})).render().$el)
        });
        return this;
    }
});

