Ext.define('ttapp.util.Common', {
    singleton: true,
    updateNotifySymbol: function(make_visible){
        var m = Ext.ComponentQuery.query('button[cls~=btn-mail]');
        if (m){
            for (var i = 0, l = m.length; i < l; i++) {
                if (make_visible){
                    m[i].addCls('show-notification');                       
                }
                else{
                    m[i].removeCls('show-notification');    
                }
            }
        }        
    }
});
