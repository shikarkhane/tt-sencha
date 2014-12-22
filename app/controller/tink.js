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
                startedthinking: 'onThinking',
                stoppedthinking: 'onStoppedThinking'
            }
        }
    },
    
onSwiffyReady : function(me) {
        console.log('inside controller function');
        
}

});
