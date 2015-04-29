Ext.define('ttapp.model.IpInfo', {
    extend: 'Ext.data.Model',

    config: {
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