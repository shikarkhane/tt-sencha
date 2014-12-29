Ext.define('ttapp.controller.SendTo', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            
        },
        control: {
            'sendto list toolbar searchfield': {
                show: 'searchReady'
            }
            
        }
    },
    searchReady : function(){
        console.log('ready to search');
    }
});
