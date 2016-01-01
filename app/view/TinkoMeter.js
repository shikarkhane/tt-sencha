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
																	ttapp.util.Analytics.trackView('Contacts');
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
                html:'<div class="tinko-user-img"><div class="img-sec" id="user_img" style="background-image:url(resources/images/user-img.png); background-size: cover;"></div><div class="edit-icon"></div></div>',
                listeners: {
                    'tap': {
                        element: 'element',
                        delegate: 'div.edit-icon',
                        fn: function() {
                            function onSuccess(imageURI) {
                                Ext.Viewport.mask({
                                    xtype: 'loadmask',
                                    html: '<img src="resources/images/green-loader.png" alt="loader">'
                                });

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
                                    Ext.Viewport.setMasked(false);
                                    console.log(JSON.stringify(r));
                                    console.log("Code = " + r.responseCode);
                                    console.log("Response = " + r.response);
                                    console.log("Sent = " + r.bytesSent);
                                    Ext.getStore('profilestore').setUserImage();
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

                            navigator.camera.getPicture(onSuccess, onFailure, { sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                correctOrientation: true, quality: 50, destinationType: Camera.DestinationType.NATIVE_URI,
                                targetWidth: 400, targetHeight: 244
                            });
                        }
                    },
                    'painted': {
                        fn: function(panel, eOpts) {
                            Ext.getStore('profilestore').getUserImage(function(image) {
                                if(Ext.isEmpty(image)) {
                                    document.getElementById('user_img').style.backgroundImage = "url(resources/images/user-img.png)";
                                } else {
                                    document.getElementById('user_img').style.backgroundImage = "url("+image+"),url(resources/images/user-img.png)";
                                }
                            });
                        }
                    }
                }
            }, {
            	xtype: 'panel',
                cls:'tinko-discription',
                flex: 1,
            	html: 'this time of life my life is unique time of my life.',
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

                                        console.log('SLOWNESS: create mask in tinkometer');
                                        Ext.Viewport.mask({
                                            xtype: 'loadmask',
                                            html: '<img src="resources/images/green-loader.png" alt="loader">'
                                        });

                                        Ext.Ajax.request({
                                            url: ttapp.config.Config.getBaseURL()+'/time-split/'+user+'/',
                                            method: 'GET',
                                            disableCaching: false,
                                            success: function(response) {
                                                console.log('SLOWNESS: before mask set to false');
                                                Ext.Viewport.setMasked(false);
                                                if(Ext.isEmpty(response.responseText)) {
                                                    // (id, radius, border-width, percent)
                                                    console.log(element.dom.firstChild.firstChild.firstChild.id);
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

                                    ttapp.util.Common.askEULAPermission();
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
        console.log('tinkometer loaded');

		this.add(ttapp.util.Common.createMenuButton());

        var auth_view = Ext.getCmp('authenticate');
        if (auth_view){ Ext.Viewport.remove(auth_view, true);  };
        var confirm_view = Ext.getCmp('confirmphonenumber');
        if (confirm_view){ Ext.Viewport.remove(confirm_view, true);  };
	}
});
