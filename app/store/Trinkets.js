Ext.define('ttapp.util.TrinketProxy', {
    singleton: true,
    requires: ['ttapp.util.Common'],

    process: function(clearAll) {
        var tStore = Ext.getStore('trinketstore');

        if(clearAll){
            tStore.removeAll();
        }
        
        Ext.Ajax.request({
            url:  ttapp.config.Config.getBaseURL() + '/trinket-list/',
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
            disableCaching: false,
            
            success: function(response) {
                // if nothing has changed dont re-render feed
                if ( response.status != 200 ){
                    return 0;
                }
                var ts = Ext.JSON.decode(response.responseText.trim());                            
                var tStore = Ext.getStore('trinketstore');

                Ext.Array.each( ts, function(t) {
                    tStore.addTrinket(t.trinketId, t.groupId, t.name, t.label, t.thumbnailPath, t.swiffyPath);
                    tStore.sync();
                });
                
            }
        });
    }
});
Ext.define('ttapp.store.Trinkets', {
    extend: 'Ext.data.Store',
    requires: [
        'ttapp.model.Trinket', 'Ext.data.proxy.LocalStorage'
    ],
    config: {
        storeId: 'trinketstore',
    	model: 'ttapp.model.Trinket',
        proxy: {
            type: 'localstorage',
            id: 'trinketstoreproxy'
        }        
    },
    removeAll: function(){
        this.getProxy().clear();
        this.data.clear();
        this.sync();      
    },
    addTrinket: function(trinketId, groupId, name, label, thumbnailPath, swiffyPath){
        var t = Ext.create('ttapp.model.Trinket',{
            trinket_id: trinketId,
            group_id: groupId,
            name: name,
            label: label,
            thumbnail_path: thumbnailPath,
            swiffy_path: swiffyPath
            });

        this.add(t);
    },
    getDefaultTrinket: function(){
        this.load();
        return this.getAt(0).get('name');
    },
    getTrinketId: function(name){
        this.load();
        var v="^"+ name + "$"; 
        var nv=new RegExp(v);
        var i = this.find('name', nv);
        return this.getAt(i).get('trinket_id');
    },
    getThumbnailPath: function(name){
        //debugger;
        this.load();
        var v="^"+ name + "$"; 
        var nv=new RegExp(v);
        var i = this.find('name', nv);
        return this.getAt(i).get('thumbnail_path');
    },
    getSwiffyPath: function(name){
        this.load();
        var v="^"+ name + "$"; 
        var nv=new RegExp(v);
        var i = this.find('name', nv);
        return this.getAt(i).get('swiffy_path');
    }
 });