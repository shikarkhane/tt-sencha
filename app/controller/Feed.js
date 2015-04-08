Ext.define('ttapp.controller.Feed', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        },
        control: {
            'feed list': {
                itemtap: 'onShowTinkInFeed'
            }
        }
    },
    onShowTinkInFeed: function(){
        Ext.Viewport.setActiveItem('replaytink',{type:'slide'});
    },
    returnFormattedDate: function(timestamp){
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var d = new Date(timestamp);
        
        var date = d.getDate();
        var month = monthNames[d.getMonth()];
        var year = d.getFullYear();

        return month+' '+date+', '+year;
    }
});
