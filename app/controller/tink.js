Ext.define('ttapp.controller.tink', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            
        },
        control: {
            'main panel' : {
            viewready : 'onSwiffyReady'
        },
            'main button': {
                tap: 'onTinkPress'
            }
        }
    },
    
onSwiffyReady : function(me) {
        console.log('inside controller function');
        //Ext.get('tinkcontainer').contentWindow.tt_start_animation();
        
},
onTinkPress : function(){
    console.log('thinking');

    Ext.getDom('tinkcontainer').contentWindow.tt_start_animation();
    
}

});
