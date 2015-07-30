Ext.define('ttapp.util.TrinketProxy', {
    singleton: true,
    requires: ['ttapp.util.Common'],

    process: function(clearAll, callback) {
        var tStore = Ext.getStore('trinketstore');

        if (clearAll) {
            tStore.removeAll();
        }

        Ext.Ajax.request({
            url: ttapp.config.Config.getBaseURL() + '/trinket-list/',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            disableCaching: false,
            success: function(response) {
                // if nothing has changed dont re-render feed
                if (response.status != 200) {
                    return 0;
                }
                var ts = Ext.JSON.decode(response.responseText.trim());
                var tStore = Ext.getStore('trinketstore');

                Ext.Array.each(ts, function(t) {
                    tStore.addTrinket(t.trinketId, t.groupId, t.name, t.label, t.thumbnailPath, t.swiffyPath);
                    tStore.sync();
                });

                if (callback) {
                    callback();
                }
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
    removeAll: function() {
        this.getProxy().clear();
        this.data.clear();
        this.sync();
    },
    addTrinket: function(trinketId, groupId, name, label, thumbnailPath, swiffyPath) {
        var t = Ext.create('ttapp.model.Trinket', {
            trinket_id: trinketId,
            group_id: groupId,
            name: name,
            label: label,
            thumbnail_path: thumbnailPath,
            swiffy_path: swiffyPath
        });

        this.add(t);
    },
    getDefaultTrinket: function(callback) {
        this.load({
            scope: this,
            callback: function() {
                var record = this.getAt(0);
                callback(record ? record.get('name') : null);
            }
        });
    },
    // getTrinketId: function(name) {
    //     this.load();
    //     var v = "^" + name + "$";
    //     var nv = new RegExp(v);
    //     var i = this.find('name', nv);
    //     return this.getAt(i).get('trinket_id');
    // },
    getThumbnailPath: function(name, callback) {
        var record = null;

        if (this.getCount() > 0) {
            var v = "^" + name + "$",
                nv = new RegExp(v),
                i = this.find('name', nv);

            if (i != -1) {
                record = this.getAt(i).get('thumbnail_path');
            }
        }

        if (callback) {
            this.load({
                scope: this,
                callback: function() {
                    var v = "^" + name + "$",
                        nv = new RegExp(v),
                        i = this.find('name', nv);

                    if (i != -1) {
                        callback(this.getAt(i).get('thumbnail_path'));
                    }
                    else {
                        callback(null);
                    }
                }
            });
        }

        return record;
    },
    getSwiffyPath: function(name, callback) {
        this.load({
            scope: this,
            callback: function() {
                var v = "^" + name + "$",
                    nv = new RegExp(v),
                    i = this.find('name', nv);

                if (i != -1) {
                    callback(this.getAt(i).get('swiffy_path'));
                }
                else {
                    callback(null);
                }
            }
        });
    }
});
