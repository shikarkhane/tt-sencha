 Ext.define('ttapp.model.trinket', {
            extend: 'Ext.data.Model',
            config: {
                fields: [{
                    name: 'trinket_id',
                    type: 'int'
                }, {
                    name: 'name',
                    type: 'string'
                },{
                    name: 'swiffy_json',
                    type: 'string'
                },]
            }
        });

