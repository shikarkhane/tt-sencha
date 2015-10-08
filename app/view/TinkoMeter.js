Ext.define('ttapp.view.TinkoMeter', {
	extend: 'Ext.Container',
	xtype: 'tinkometer',
	config: {
        cls:'bg-light-gray tinkometer-section',
		items: [
			{
                xtype: 'panel',
                docked: 'top',
                cls: 'new-header',
                items: [
                    {
                        xtype: 'panel',
                        cls: 'tinkometer-logo',
                        docked: 'top'
                    }
                ]
            }, {
            	xtype: 'image',
            	mode: 'image',
                cls:'tinko-user',
            	src: 'resources/images/user-img.png'
            }, {
            	xtype: 'panel',
                cls:'tinko-discription',
            	html: 'sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut '
            }, {
            	layout: 'hbox',
                cls:'tink-in-out',
            	items: [
            		{   
                        xtype:'panel',
                        cls:'in-out-list',  
            			html: '<div class="tink-in"><span class="heading">Tink In</span><span class="time">01:08:24</span></div>',
            		}, {
                        xtype:'panel',
                        cls:'in-out-list in-out-bar',
                        html:'<div class="circle" id="tinkometerCircle"></div>',
                        listeners: {
                            'painted': {
                                fn: function(element) {
                                    Ext.getStore('profilestore').getPhoneNumber(function(user) {
                                        if (!user) {
                                            if (callback) {
                                                callback(false);
                                            }
                                            return false;
                                        }
                                        Ext.Ajax.request({
                                            url: ttapp.config.Config.getBaseURL()+'/time-split/'+user+'/',
                                            method: 'GET',
                                            disableCaching: false,
                                            success: function(response) {
                                                obj = Ext.decode(response.responseText);
                                                total_time = obj.time_in + obj.time_out;
                                                percent = (obj.time_out/total_time)*100;
                                                console.log(Math.ceil(percent));
                                                // (id, radius, border-width, percent)
                                                testCircleCss(element.dom.firstChild.firstChild.firstChild.id, 50, 10, Math.ceil(percent));
                                            },
                                            failure: function() {

                                            }
                                        });
                                    });
                                }
                            }
                        }
                    }, {
                        xtype:'panel',
                        cls:'in-out-list',
            			html: '<div class="tink-in"><span class="heading">Tink Out</span><span class="time">06:21:30</span></div>'
            		}
            	]
            }, {
                xtype:'panel',
                cls:'social-section',
            	html: '<span class="social-icon twitter"></span><span class="social-icon facebook"></span><span class="social-icon instagram"></span>'
            }
		]
	},
	initialize: function() {
		this.add(ttapp.util.Common.createMenuButton());
	}
});