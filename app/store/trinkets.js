Ext.define('ttapp.store.Trinkets', {
    extend: 'Ext.data.Store',
    config: {
        storeId: 'trinketstore',
    	model: 'ttapp.model.Trinket',
        data: [
        {
            'trinket_id': "1",
            'name': "default",
            'label': "Classic",
            'thumbnail_path': "http://icons.iconarchive.com/icons/guillendesign/variations-3/256/Default-Icon-icon.png",
            'file_path': 'default.html'
        },
        {
            'trinket_id': "2",
            'name': "japanese-art",
            'label': "Yoko Mosiro",
            'thumbnail_path': "http://3.bp.blogspot.com/-Ym11wW_7EDM/TfZV-svjbEI/AAAAAAAASuA/YEp21pLkD9A/s1600/wandering+son.jpg",
            'file_path': 'japanese-art.html'
        },
        {
            'trinket_id': "3",
            'name': "retro",
            'label': "Magic retro",
            'thumbnail_path': "https://lh4.googleusercontent.com/-zjDcdgxjYn8/AAAAAAAAAAI/AAAAAAAAAAA/2kCdlHilc7c/photo.jpg",
            'file_path': 'retro.html'
        },
        {
            'trinket_id': "4",
            'name': "kids",
            'label': "Little wonder",
            'thumbnail_path': "https://lh6.googleusercontent.com/-iXf078xniKQ/AAAAAAAAAAI/AAAAAAAAATs/jsuIkakKKPk/photo.jpg",
            'file_path': 'kids.html'
        },
        {
            'trinket_id': "5",
            'name': "teenager",
            'label': "Teenage mutant ninja",
            'thumbnail_path': "http://fc03.deviantart.net/fs71/f/2013/163/1/2/teenage_mutant_ninja_turtles_our_of_the_shadows_by_kuhleeting123-d68teu1.png",
            'file_path': 'teenage.html'
        },
        {
            'trinket_id': "6",
            'name': "money",
            'label': "Dollar shine",
            'thumbnail_path': "https://cdn0.iconfinder.com/data/icons/customicondesign-office6-shadow/256/US-dollar.png",
            'file_path': 'money.html'
        },
        {
            'trinket_id': "7",
            'name': "elvis",
            'label': "Elvis live",
            'thumbnail_path': "https://lh6.googleusercontent.com/-_4qZvsaeGoU/AAAAAAAAAAI/AAAAAAAAABI/AL1BJfU6_7A/photo.jpg",
            'file_path': 'elvis.html'
        },
        {
            'trinket_id': "8",
            'name': "train",
            'label': "Supertrain",
            'thumbnail_path': "http://www.iconarchive.com/download/i51255/awicons/vista-artistic/1-Normal-Train.ico",
            'file_path': 'train.html'
        },
        {
            'trinket_id': "9",
            'name': "fish",
            'label': "Fishing",
            'thumbnail_path': "http://pix.iemoji.com/sbemojix2/0343.png",
            'file_path': 'fish.html'
        },
        {
            'trinket_id': "10",
            'name': "coke",
            'label': "Coca cola",
            'thumbnail_path': "http://www.coca-cola.com/template1/global/images/coke_disc.png",
            'file_path': 'coke.html'
        }
        ]
    },
    getDefaultTrinket: function(){
        this.load();
        return this.getAt(0).get('name');
    }
    ,
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