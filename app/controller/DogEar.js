Ext.define('ttapp.controller.DogEar', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        },
        control: {
            'tink toolbar': {
                tap: 'goToFeed'
            },
            'feed toolbar': {
                tap: 'goToTink'
            }
        }
    },
    goToTink: function(){
        Ext.Viewport.setActiveItem('tink');
    },
    goToFeed: function(){
        Ext.Viewport.setActiveItem('feed');
    }
});
