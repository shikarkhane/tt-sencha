Ext.define('ttapp.controller.Landing', {
    extend: 'Ext.app.Controller',
    requires: ['ttapp.store.Profile'],
    config: {
        refs: {
        },
        control: {
            'landing': {
                userAcknowledge: 'onUserAction'
            }
        }
    },
    onUserAction: function(){
        if ( Ext.getStore('profilestore').isUserVerified() === true){
            Ext.Viewport.setActiveItem('tink');
        }
        else{
            Ext.Viewport.setActiveItem('authenticate');   
        }
    }
});
