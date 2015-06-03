 Ext.define('ttapp.model.Trinket', {
            extend: 'Ext.data.Model',
            config: {
                fields: [{
                    name: 'trinket_id',
                    type: 'int'
                },{
                    name: 'group_id',
                    type: 'string'
                }, {
                    name: 'name',
                    type: 'string'
                },{
                    name: 'label',
                    type: 'string'
                },{
                    name: 'thumbnail_path',
                    type: 'string'
                },
                {
                    name: 'swiffy_path',
                    type: 'string'
                }]
            }
        });

