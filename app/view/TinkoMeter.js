Ext.define('ttapp.view.TinkoMeter', {
	extend: 'Ext.Container',
	xtype: 'tinkometer',
	config: {
        cls:'bg-light-gray tinkometer-section',
		items: [
			{
                xtype: 'panel',
                flex: 1,
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
            	xtype: 'panel',
                cls:'tinko-user',
                flex: 2,
                html:'<div class="tinko-user-img"><div class="img-sec"><img id="user_img" src="resources/images/user-img.png" alt="img"></div><div class="edit-icon"></div></div>',
                listeners: {
                    'tap': {
                        element: 'element',
                        delegate: 'div.edit-icon',
                        fn: function() {
                            function onSuccess(imageURI) {
                                console.log('imageURI_'+imageURI);
                                document.getElementById('user_img').src = "data:image/jpeg;base64,"+imageURI;
                            }

                            function onFailure() {
                                Ext.Msg.alert("Warning","Unable to access this image, please choose from 'Gallery' again.");
                            }

                            navigator.camera.getPicture(onSuccess, onFailure, { sourceType: Camera.PictureSourceType.PHOTOLIBRARY, correctOrientation: true, quality: 50, destinationType: Camera.DestinationType.DATA_URL
                            });
                        }
                    }
                }
            }, {
            	xtype: 'panel',
                cls:'tinko-discription',
                flex: 1,
            	html: 'sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut ',
                listeners: {
                    'painted': {
                        fn: function() {
                            this.setHtml(ttapp.util.Common.userDescription());
                        }
                    }
                }
            }, {
            	layout: 'hbox',
                flex: 2,
                cls:'tink-in-out',
            	items: [
            		{   
                        xtype:'panel',
                        flex: 2,
                        cls:'in-out-list',  
            			html: '<div class="tink-in"><span class="heading">Tink In</span><span class="time tink-in-user">01:08:24</span></div>',
            		}, {
                        xtype:'panel',
                        flex: 2,
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
                                                // (id, radius, border-width, percent)
                                                testCircleCss(element.dom.firstChild.firstChild.firstChild.id, 50, 10, Math.ceil(percent));

                                                Ext.select('.tink-out-user').setHtml(showTinkTime(obj.time_out));
                                                Ext.select('.tink-in-user').setHtml(showTinkTime(obj.time_in));
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
                        flex: 2,
                        cls:'in-out-list',
            			html: '<div class="tink-in"><span class="heading">Tink Out</span><span class="time tink-out-user">06:21:30</span></div>'
            		}
            	]
            }, {
                xtype:'panel',
                flex: 1,
                cls:'social-section',
            	html: '<span class="social-icon twitter"></span><span class="social-icon facebook"></span><span class="social-icon instagram"></span>'
            }
		]
	},
	initialize: function() {
		this.add(ttapp.util.Common.createMenuButton());
	}
});