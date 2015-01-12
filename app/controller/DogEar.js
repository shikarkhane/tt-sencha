Ext.define('ttapp.controller.DogEar', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        },
        control: {
            'tink toolbar #ext-button-2': {
                tap: 'goToFeed'
            },
            'feed toolbar #ext-button-1': {
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
