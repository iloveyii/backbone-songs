console.log2 = function (x, y) {
    document.write('<pre>');

    if(y instanceof Song) {
        document.write(x + '<br />');
        for(var k in y) {
            document.write(k + ' : ' + y[k] + '<br />');
        }
    } else {
        document.write(x + y + '<br />');
    }

    document.write('</pre>');
};

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

    urlRoot: '/api/songs',
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

console.log('The song: ', song);
console.log('To json: ', song.toJSON());
console.log('Get attr, title:', song.get('title'));
// console.log('Remove attr, title', song.unset('title'));

console.log('HasAttr, title: ', song.has('title'));

console.log('Is model valid: ', song.isValid());
song.commonMethod();

var song1 = new Song({id : 2});
song.fetch({
        success: function (resp) {
            console.log('Resp: ', resp);
        },
        error: function () {
            console.log('error in fetching song.');
        }
    }
);
console.log('Fetched song: ', song); // the id sent to server is wrong as 10

// Collections

var Songs = Backbone.Collection.extend({
    model : Song,
    url: 'api/songs'
});

var songs = new Songs([
    new Song({title: 'Title 01'}),
    new Song({title: 'Title 02'}),
    new Song({title: 'Title 03'}),
    new Song({title: 'Title 04'})
]);

// Add to collection
songs.add(new Song({title: 'Title 05'}));
console.log('The collection: ', songs);
console.log('Song at 1:', songs.at(1)); // starting from 0 index
console.log('Song at c3:', songs.get('c3'));
// Remove from collection
songs.remove(songs.at(0));
console.log('After songs remove: ', songs);

// Fetching collections
songs.fetch();

