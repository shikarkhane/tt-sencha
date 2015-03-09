 Ext.define('ttapp.model.Trinket', {
            extend: 'Ext.data.Model',
            config: {
                fields: [{
                    name: 'trinket_id',
                    type: 'int'
                }, {
                    name: 'name',
                    type: 'string'
                },{
                    name: 'label',
                    type: 'string'
                },{
                    name: 'thumbnail_path',
                    type: 'string'
                },{
                    name: 'file_path',
                    type: 'string'
                }]
            }
        });

