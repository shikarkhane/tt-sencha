Ext.define('ttapp.controller.Landing', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        },
        control: {
            'landing': {
                userAcknowledge: function(){
                    Ext.Viewport.setActiveItem('authenticate');
                }
            }
        }
    }
});
