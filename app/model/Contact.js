Ext.define('ttapp.model.Contact', {
    extend: 'Ext.data.Model',

    config: {
        identifier: {
            type: 'uuid'
        },
        fields: [
            {
                name: 'id',
                type: 'int'
            },
            {
                name: 'first_name',
                type: 'string'
            },
            {
                name: 'last_name',
                type: 'string'
            },
            {
                name: 'on_tinktime',
                type: 'boolean'
            },
            {
                name: 'phone_number',
                type: 'string'
            },
            {
                name: 'phone_type',
                type: 'string'
            },
            {
                name: 'time_split',
                type: 'string'
            },
            {
                name: 'profile_url',
                type: 'string'
            }
        ]
    }
});
