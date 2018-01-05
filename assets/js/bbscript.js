// Backbone.Model.prototype.idAttribute = 'id';
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

    urlRoot: '/api/songs',// very important for delete method
    idAttribute: 'id', // very important for delete method else delete will fire only on api/songs without id
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
    events: {
        'click .item-edit' : 'edit',
        'click .item-delete' : 'delete',
        'click .item-update' : 'update',
        'click .item-cancel' : 'cancel'
    },
    controls: function() {
        return {
            title: this.$('.title'),
            author: this.$('.author'),
            artist: this.$('.artist')
        }
    },
    controlsData: {},
    setControlsData: function (data) {
        this.controlsData = {
            title: data.title,
            author: data.author,
            artist: data.artist
        };
        return this.controlsData;
    },
    edit: function () {
        this.setControlsData({
                title: this.$('.title').html(),
                author: this.$('.author').html(),
                artist: this.$('.artist').html()
        });
        this.controls().title.html('<input type="text" class="form-control title-update" value="'+this.controlsData.title+'" />');
        this.controls().author.html('<input type="text" class="form-control author-update" value="'+this.controlsData.author+'" />');
        this.controls().artist.html('<input type="text" class="form-control artist-update" value="'+this.controlsData.artist+'" />');
        this.toggleButtons();
    },
    update: function () {
        var data = {
            title: this.$('.title-update').val(),
            author: this.$('.author-update').val(),
            artist: this.$('.artist-update').val()
        };
        this.setControlsData(data);

        window.cd = this.controlsData;
        console.log(this.controlsData);

        this.controls().title.html(this.controlsData.title);
        this.controls().author.html(this.controlsData.author);
        this.controls().artist.html(this.controlsData.artist);
        console.log(this.model.save(data));

        this.toggleButtons();
    },
    cancel: function () {
        this.controls().title.html(this.controlsData.title);
        this.controls().author.html(this.controlsData.author);
        this.controls().artist.html(this.controlsData.artist);
        this.toggleButtons();
    },
    delete: function () {
        // console.log('Removing model: ' + this.model.get('id'));
        songs.remove(this.model);
        this.model.destroy();
        this.$el.remove();
    },

    toggleButtons: function () {
        this.$('.item-edit').toggle();
        this.$('.item-delete').toggle();

        this.$('.item-update').toggle();
        this.$('.item-cancel').toggle();
    },
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

