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
                cls: 'new-header tinko-meter-header',
                items: [
                    {
                        xtype: 'panel',
                        cls: 'tinkometer-logo',
                        docked: 'top',
                        items:[
                            {
                                xtype: 'button',
                                cls: 'next-btn-icon',
                                docked: 'right',
                                handler: function() {
                                    Ext.Viewport.animateActiveItem('phoneContacts', { type: 'slide' });
                                }
                            }
                        ]
                    } 
                ]
            }, {
            	xtype: 'panel',
                cls:'tinko-user',
                flex: 2,
                html:'<div class="tinko-user-img"><div class="img-sec" id="user_img" style="background-image:url(resources/images/user-img.png);     background-size: cover;"></div><div class="edit-icon"></div></div>',
                listeners: {
                    'tap': {
                        element: 'element',
                        delegate: 'div.edit-icon',
                        fn: function() {
                            function onSuccess(imageURI) {
                                if(Ext.os.is('Android')) {
                                    window.FilePath.resolveNativePath(imageURI, function(response) {
                                        console.log("success__"+JSON.stringify(response));
                                    }, function(response) {
                                        console.log("fail__"+JSON.stringify(response));
                                    }); 
                                }
                                
                                console.log('imageURI_'+imageURI);

                                Ext.Viewport.mask({
                                    xtype: 'loadmask',
                                    html: '<img src="resources/images/green-loader.png" alt="loader">'
                                });

                                document.getElementById('user_img').style.backgroundImage = "url("+imageURI+")";

                                var win = function(r) {
                                    console.log(JSON.stringify(r));
                                    console.log("Code = " + r.responseCode);
                                    console.log("Response = " + r.response);
                                    console.log("Sent = " + r.bytesSent);
                                    Ext.Viewport.setMasked(false);
                                }

                                var fail = function(error) {
                                    console.log("upload error source " + error.source);
                                    console.log("upload error target " + error.target);
                                    Ext.Viewport.setMasked(false);
                                    Ext.Msg.alert("Error", "An error has occurred. Please try again.");
                                }

                                var options = new FileUploadOptions();
                                options.fileKey = "profile-picture";
                                options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                                options.mimeType = "image/jpeg";

                                var headers = {
                                    'contentType': 'multipart/form-data'
                                };

                                options.headers = headers;

                                var ft = new FileTransfer();

                                Ext.getStore('profilestore').getPhoneNumber(function(num){
                                   console.log(num);
                                    ft.upload(imageURI, encodeURI(ttapp.config.Config.getBaseURL()+"/profile-picture/"+num+"/"), win, fail, options);
                                });
                            }

                            function onFailure() {
                                Ext.Msg.alert("Warning","Unable to access this image, please choose from 'Gallery' again.");
                            }

                            navigator.camera.getPicture(onSuccess, onFailure, { sourceType: Camera.PictureSourceType.PHOTOLIBRARY, correctOrientation: true, quality: 50, destinationType: Camera.DestinationType.NATIVE_URI
                            });
                        }
                    },
                    'painted': {
                        fn: function(panel, eOpts) {
                            Ext.getStore('profilestore').getPhoneNumber(function(num){
                                document.getElementById('user_img').style.backgroundImage = "url("+ttapp.config.Config.getBaseURL()+'/static/img/user_profile/'+num+".jpeg)"; 
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
                                                if(Ext.isEmpty(response.responseText)) {
                                                    // (id, radius, border-width, percent)
                                                    testCircleCss(element.dom.firstChild.firstChild.firstChild.id, 50, 10, 100);
                                                    Ext.select('.tink-out-user').setHtml('00:00:00');
                                                    Ext.select('.tink-in-user').setHtml('00:00:00');
                                                    return;
                                                } else {
                                                    obj = Ext.decode(response.responseText);
                                                    total_time = parseInt(obj.time_in) + parseInt(obj.time_out);
                                                    percent = (parseInt(obj.time_out)/total_time)*100;
                                                    // (id, radius, border-width, percent)
                                                    testCircleCss(element.dom.firstChild.firstChild.firstChild.id, 50, 10, Math.ceil(percent));
                                                    Ext.select('.tink-out-user').setHtml(showTinkTime(obj.time_out));
                                                    Ext.select('.tink-in-user').setHtml(showTinkTime(obj.time_in));
                                                }
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