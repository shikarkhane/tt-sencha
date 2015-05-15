Ext.define('ttapp.controller.DogEar', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            btnToTink: 'button[cls~=btn-tink]',
            btnToFeed: 'button[cls~=btn-mail]'
        },
        control: {
            'btnToTink': {
                tap: 'goToTink'
            },
            'btnToFeed': {
                tap: 'goToFeed'
            }
        }
    },
    goToTink: function() {
        Ext.Viewport.animateActiveItem('trinket',{type:'slide', direction: 'right'});  
    },
    goToFeed: function() {
        Ext.Viewport.animateActiveItem('feed',{type:'slide'}); 
        ttapp.util.FeedProxy.process(true);
    }
});