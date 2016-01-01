Ext.define('ttapp.model.Profile', {
    extend: 'Ext.data.Model',

    config: {
        identifier: {
            type: 'uuid'
        },
        fields: [
            'phone_number',
            'is_verified',
            'last_updated_on',
            'selected_trinket_name',
            'last_seconds_sent',
            'profile_url',
            'allowedEULAContactsRead',
            'allowedPushNotification'
        ],
        validations: [{
            type: 'format',
            name: 'phone_number',
            matcher: /^\+[0-9]+/,
            message: "(+) followed by digits only."
        }]
    }
});
