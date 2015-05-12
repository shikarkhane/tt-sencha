Ext.define('ttapp.store.Trinkets', {
    extend: 'Ext.data.Store',
    config: {
        storeId: 'trinketstore',
    	model: 'ttapp.model.Trinket',
        data: [
        {
            'trinket_id': "1",
            'group_id':1,
            'name': "cute-dancing-guy",
            'label': "Cute dancing guy",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/cute-dancing-guy.png",
            'file_path': 'cute-dancing-guy.html'
        },
        {
            'trinket_id': "2",
            'group_id':1,
            'name': "ice-cream",
            'label': "Ice-cream",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/ice-cream.png",
            'file_path': 'ice-cream.html'
        },
        {
            'trinket_id': "3",
            'group_id':1,
            'name': "scrabble-love",
            'label': "Scrabble love",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/scrabble-love.png",
            'file_path': 'scrabble-love.html'
        },
        {
            'trinket_id': "4",
            'group_id':1,
            'name': "bubble-gum-cat",
            'label': "Bubble gum cat",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/bubble-gum-cat.png",
            'file_path': 'bubble-gum-cat.html'
        },
        {
            'trinket_id': "5",
            'group_id':1,
            'name': "cute-kissing-guy",
            'label': "Cute kissing guy",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/cute-kissing-guy.png",
            'file_path': 'cute-kissing-guy.html'
        },
        {
            'trinket_id': "6",
            'group_id':1,
            'name': "kisses",
            'label': "Kisses",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/kisses.png",
            'file_path': 'kisses.html'
        },
        {
            'trinket_id': "7",
            'group_id':1,
            'name': "singing-cat",
            'label': "Singing cat",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/singing-cat.png",
            'file_path': 'singing-cat.html'
        },
        {
            'trinket_id': "8",
            'group_id':1,
            'name': "bunny-flowers",
            'label': "Bunny flowers",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/bunny-flowers.png",
            'file_path': 'bunny-flowers.html'
        },
        {
            'trinket_id': "9",
            'group_id':1,
            'name': "good-luck-cat",
            'label': "Good luck cat",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/good-luck-cat.png",
            'file_path': 'good-luck-cat.html'
        },
        {
            'trinket_id': "10",
            'group_id':2,
            'name': "panda-balloon-hat",
            'label': "Panda balloon hat",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/panda-balloon-hat.png",
            'file_path': 'panda-balloon-hat.html'
        },
        {
            'trinket_id': "11",
            'group_id':2,
            'name': "singing-panda",
            'label': "Singing panda",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/singing-panda.png",
            'file_path': 'singing-panda.html'
        },
        {
            'trinket_id': "12",
            'group_id':2,
            'name': "cats-peek",
            'label': "Cats peek",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/cats-peek.png",
            'file_path': 'cats-peek.html'
        },
        {
            'trinket_id': "13",
            'group_id':2,
            'name': "hedgehog-hug",
            'label': "Hedgehog hug",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/hedgehog-hug.png",
            'file_path': 'hedgehog-hug.html'
        },
        {
            'trinket_id': "14",
            'group_id':2,
            'name': "panda-umbrella",
            'label': "Panda umbrella",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/panda-umbrella.png",
            'file_path': 'panda-umbrella.html'
        },
        {
            'trinket_id': "15",
            'group_id':2,
            'name': "sleeping-bear",
            'label': "Sleeping bear",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/sleeping-bear.png",
            'file_path': 'sleeping-bear.html'
        },
        {
            'trinket_id': "16",
            'group_id':2,
            'name': "cherry-blossom",
            'label': "Cherry blossom",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/cherry-blossom.png",
            'file_path': 'cherry-blossom.html'
        },
        {
            'trinket_id': "17",
            'group_id':2,
            'name': "hugs",
            'label': "hugs",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/hugs.png",
            'file_path': 'hugs.html'
        },
        {
            'trinket_id': "18",
            'group_id':2,
            'name': "rabbit-umbrella-hearts",
            'label': "Rabbit umbrella hearts",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/rabbit-umbrella-hearts.png",
            'file_path': 'rabbit-umbrella-hearts.html'
        },
        {
            'trinket_id': "19",
            'group_id':3,
            'name': "surprise-party",
            'label': "Surprise party",
            'thumbnail_path': "http://tinktime.com/static/img/tinks/surprise-party.png",
            'file_path': 'surprise-party.html'
        }
        ]
    },
    
    getDefaultTrinket: function(){
        this.load();
        return this.getAt(0).get('name');
    },
    getTrinketId: function(name){
        this.load();
        var i = this.find('name', name);
        return this.getAt(i).get('trinket_id');
    },
    getFilePath: function(name){
        this.load();
        var i = this.find('name', name);
        return this.getAt(i).get('file_path');
    },
    getThumbnailPath: function(name){
        this.load();
        var i = this.find('name', name);
        return this.getAt(i).get('thumbnail_path');
    }
 });