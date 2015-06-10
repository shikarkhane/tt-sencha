Ext.define('ttapp.overrides.SizeMonitor', {
    override : 'Ext.util.SizeMonitor',

    constructor : function(config) {
        var namespace = Ext.util.sizemonitor;

        if (Ext.browser.is.Firefox) {
            return new namespace.OverflowChange(config);
        } else if (Ext.browser.is.WebKit || Ext.browser.is.IE11) {
            return new namespace.Scroll(config);
        } else {
            return new namespace.Default(config);
        }
    }
});
