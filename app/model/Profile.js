Ext.define('ttapp.model.Profile', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'phone_number',
            'is_verified',
            'last_updated_on',
            'selected_trinket_name'
        ],
        validations: [
            {
                type: 'format',
                name: 'phone_number',
                matcher: /^\+[0-9]+$/,
                message:"(+) followed by digits only."
            }
        ]
    }
});