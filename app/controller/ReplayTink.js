Ext.define('ttapp.controller.ReplayTink', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            replaypage: 'container[cls~=cls-tt-replaytink]',
            closereplay: 'button[cls~=replay-tink-close-btn]'
        },
        control: {
            closereplay: {
                tap: 'closeReplay'
            }
        }
    },
    closeReplay: function() {
        Ext.ComponentQuery.query('#replayTinkPage')[0].destroy();

        /*Ext.Viewport.setActiveItem('feed', {
            type: 'fade'
        });*/
        Ext.Viewport.setActiveItem('tinkchat', {
            type: 'fade'
        });
    },
    addReplay: function(seconds, text, trinket_name) {
        Ext.getStore('trinketstore').getSwiffyPath(trinket_name, function(activeTrinketSwiffyPath) {
            var r = Ext.create('Ext.Container', {
                modal: true,
                xtype: 'replaytink',
                itemId: 'replayTinkPage',
                cls: 'cls-tt-tinkbox cls-tt-replaytink',
                layout: {
                    type: 'vbox',
                    align: 'middle'
                },
                items: [{
                    xtype: 'toolbar',
                    docked: 'top',
                    html: seconds + ' sec',
                    zIndex: 2,
                    cls: 'replay-top-bar',
                    items: [{
                        xtype: 'button',
                        cls: 'top-btn btn-delete replay-tink-close-btn',
                        docked: 'right'
                    }]
                }, {
                    xtype: 'panel',
                    itemId: 'replaycomponent',
                    //flex: 5,
                    html: '<iframe id="replaytinkcontainer" class="tinkanimation" allowtransparence="true"></iframe>'
                }]
            });

            if (text.length > 0) {
                r.add({
                    xtype: 'toolbar',

                    docked: 'bottom',
                    cls: 'clsReplayTextMessage',
                    flex: 1,
                    html:  text 
                });
            }

            var trinketArea = r.child('#replaycomponent'),
                iframe = trinketArea.element.down('iframe');

            Ext.Viewport.mask({
                xtype: 'loadmask',
                html: '<img src="resources/images/green-loader.png" alt="loader">'
            });

            Ext.Viewport.add(r);
            r.show();
            r.element.setStyle('opacity', '0');

            iframe.dom.onload = function() {
                Ext.Viewport.unmask();

                r.element.setStyle('opacity', '1');
                iframe.dom.onload = null;

                Ext.Viewport.setActiveItem(r);

                iframe.dom.contentWindow.tt_start_animation();
            };

            iframe.dom.src = activeTrinketSwiffyPath;
        });
    }
});
