Ext.define('ttapp.overrides.PaintMonitor', {
    override : 'Ext.util.PaintMonitor',

    constructor : function(config) {
        return new Ext.util.paintmonitor.CssAnimation(config);
    }
});
