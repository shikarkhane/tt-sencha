Ext.define('ttapp.model.IpInfo', {
    extend: 'Ext.data.Model',

    config: {

         identifier: {
                    type: 'uuid'
                },
        fields: [
             "ip",
            "hostname",
            "city",
            "region",
            "country",
            "loc",
            "org",
            "postal",
            "country_dial_code"
        ]
    }
});