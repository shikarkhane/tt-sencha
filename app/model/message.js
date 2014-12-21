 Ext.define('Message', {
            extend: 'Ext.data.Model',
            config: {
                fields: [{
                    name: 'from_user',
                    type: 'string'
                }, {
                    name: 'to_user',
                    type: 'string'
                }, {
                    name: 'send_timestamp',
                    type: 'int'
                }, {
                    name: 'trinket_id',
                    type: 'int'
                }, {
                    name: 'text',
                    type: 'string'
                },{
                    name: 'seconds_sent',
                    type: 'int'
                }]
            }
        });

