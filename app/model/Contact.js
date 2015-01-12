Ext.define('ttapp.model.Contact', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'id',
            'first_name',
            'last_name',
            'on_tinktime',
            'phone_number'
        ]
    }
});
