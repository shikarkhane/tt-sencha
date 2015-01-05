Ext.define('ttapp.controller.Landing', {
    extend: 'Ext.app.Controller',
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
        if ( this.isUserVerified === true){
            Ext.Viewport.setActiveItem('tink');
        }
        else{
            Ext.Viewport.setActiveItem('authenticate');   
        }
    },
    isUserVerified: function(){
        var profileStore = Ext.getStore('profilestore');
        profileStore.each(function(p){
                isVerified = p.data.is_verified;
                return false;
            });
        return is_verified;
    }
});
