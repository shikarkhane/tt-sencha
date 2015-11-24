Ext.define('ttapp.controller.TinkBox', {
	extend: 'Ext.app.Controller',
	config: {
		control: {
			'tinkbox': {
				show: 'getTinkBoxData',
                hide: 'removeTinkBoxList'
			},
			'tinkbox dataview': {
				itemtap: 'onTinkBoxSelect'
			}
		}
	},
    removeTinkBoxList: function(list, eOpts) {
        if(!Ext.isEmpty(Ext.getCmp('tinkBoxList'))) {
            Ext.getCmp('tinkBoxList').destroy();
        }
    },
	getTinkBoxData: function(component) {
		//console.log('in tink box');
        Ext.Viewport.mask({
            xtype: 'loadmask',
            html: '<img src="resources/images/green-loader.png" alt="loader">'
        });
        Ext.getStore('profilestore').getPhoneNumber(function(num){
            Ext.Ajax.request({
                url: ttapp.config.Config.getBaseURL() + '/groupedfeed/' + num + '/',
                method: 'GET',
                disableCaching: false,
                success: function(response) {
                    var json = Ext.JSON.decode(response.responseText);
                    var temp = [];
                    var topItemData = [];

                    for (i=0; i<json.groups.length; i++) {
                        if(!Ext.isEmpty(window.afterTinkSent)) {
                            if(json.groups[i].user == window.contactSelected.data.phone_number) {
                                topItemData.push({
                                    'tink_in': displaytimer(json.groups[i].tink_in),
                                    'tink_out': displaytimer(json.groups[i].tink_out),
                                    'unread': json.groups[i].unread,
                                    'user': getName(json.groups[i].user),
                                    'img': ttapp.util.Common.animationThumbnail(),
                                    'background': Ext.getStore('phonecontacts').getUserImage(json.groups[i].user),
                                    'number': json.groups[i].user,
                                    'inout': json.groups[i].tink_in+"-"+json.groups[i].tink_out
                                }); 
                            } else {
                                temp.push({
                                    'tink_in': displaytimer(json.groups[i].tink_in),
                                    'tink_out': displaytimer(json.groups[i].tink_out),
                                    'unread': json.groups[i].unread,
                                    'user': getName(json.groups[i].user),
                                    'img': ttapp.util.Common.animationThumbnail(),
                                    'background': Ext.getStore('phonecontacts').getUserImage(json.groups[i].user),
                                    'number': json.groups[i].user,
                                    'inout': json.groups[i].tink_in+"-"+json.groups[i].tink_out
                                });        
                            }
                        } else {
                            temp.push({
                                'tink_in': displaytimer(json.groups[i].tink_in),
                                'tink_out': displaytimer(json.groups[i].tink_out),
                                'unread': json.groups[i].unread,
                                'user': getName(json.groups[i].user),
                                'img': ttapp.util.Common.animationThumbnail(),
                                'background': Ext.getStore('phonecontacts').getUserImage(json.groups[i].user),
                                'number': json.groups[i].user,
                                'inout': json.groups[i].tink_in+"-"+json.groups[i].tink_out
                            });
                        }
                    }
                    Ext.getStore('tinkBoxStore').addData(temp);

                    if(!Ext.isEmpty(window.afterTinkSent)) {
                        Ext.getStore('tinkBoxStore').insert(0, topItemData);
                        delete window.afterTinkSent;
                    }
                    Ext.Viewport.setMasked(false);
                },
                failure: function(error) {
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert('Error', 'Unable to fetch data.');
                }
            });
        });

		var list = Ext.create('Ext.List', {
            height: '100%',
            id: 'tinkBoxList',
            cls: 'tinkbox-section',
            itemTpl: [
                '<tpl if="unread == 0">',
                    '<tpl if="tink_in &gt; tink_out">',
                        '<div class="list-box" style="background:url({background}) no-repeat 50% 50%">',
                            '<div class="over-lay"></div>',
                            '<span class="inner-detail"><span class="user-name">{user}</span><span class="info"><span class="circle"><img src={img} ></span><span class="time">{tink_in}</span><span class="tinkinout">Tink in</span></span><span class="info right"><span class="circle"><img src={img} ></span><span class="time">{tink_out}</span><span class="tinkinout">Tink out</span></span><span class="arrow"></span></span>',
                        '</div>',
                    '<tpl else>',
                        '<div class="list-box" style="background:url({background}) no-repeat 50% 50%">',
                            '<div class="over-lay"></div>',
                            '<span class="inner-detail"><span class="user-name">{user}</span><span class="info right"><span class="circle"><img src={img} ></span><span class="time">{tink_in}</span><span class="tinkinout">Tink in</span></span><span class="info"><span class="circle"><img src={img} ></span><span class="time">{tink_out}</span><span class="tinkinout">Tink out</span></span><span class="arrow"></span></span>',
                        '</div>',
                    '</tpl>',
                '<tpl else>',
                    '<tpl if="tink_in &gt; tink_out">',
                        '<div class="list-box" style="background:url({background}) no-repeat 50% 50%">',
                            '<div class="over-lay"></div>',
                            '<span class="inner-detail"><span class="user-name">{user}</span><span class="info"><span class="circle active"><span class="notification-icon"></span><img src={img} ></span><span class="time">{tink_in}</span><span class="tinkinout">Tink in</span></span><span class="info right"><span class="circle"><img src={img} ></span><span class="time">{tink_out}</span><span class="tinkinout">Tink out</span></span><span class="arrow"></span></span>',
                        '</div>',
                    '<tpl else>',
                        '<div class="list-box" style="background:url({background}) no-repeat 50% 50%">',
                            '<div class="over-lay"></div>',
                            '<span class="inner-detail"><span class="user-name">{user}</span><span class="info right"><span class="circle"><img src={img} ></span><span class="time">{tink_in}</span><span class="tinkinout">Tink in</span></span><span class="info"><span class="circle"><img src={img} ></span><span class="time">{tink_out}</span><span class="tinkinout">Tink out</span></span><span class="arrow"></span></span>',
                        '</div>',  
                    '</tpl>',
                '</tpl>',
            ],
            store: {
                id: 'tinkBoxStore',
                autoLoad: true,
                fields: ['tink_in', 'tink_out', 'unread', 'user', 'img', 'background', 'number', 'inout']
            },
            listeners: {
                refresh: function(list, eOpts) {
                    var store = Ext.getStore('tinkBoxStore').getData().all;
                    if(!Ext.isEmpty(store)) {
                        var counter = 0;
                        function imageExistsForTinkBox(url, callback, timeout) {
                            timeout = timeout || 3000;
                            var timedOut = false, timer;
                            var img = new Image();
                            img.onerror = img.onabort = function() {
                                if (!timedOut) {
                                    clearTimeout(timer);
                                    callback("error");
                                }
                            };
                            img.onload = function() {
                                if (!timedOut) {
                                    clearTimeout(timer);
                                    callback("success");
                                }
                            };
                            img.src = url;
                            timer = setTimeout(function() {
                                timedOut = true;
                                callback("timeout");
                            }, timeout);
                        }

                        function recursiveStoreForTinkBox(counter) {
                            if(!Ext.isEmpty(store[counter])) {
                                imageExistsForTinkBox(store[counter].data.background, function(exists) {
                                    if(exists != 'success') {
                                        store[counter].data.background = getBackgroundImage(store[counter].data.number);
                                        store[counter].set('background', store[counter].data.background);
                                    }
                                    counter++;
                                    recursiveStoreForTinkBox(counter);
                                });
                            }
                        }

                        recursiveStoreForTinkBox(counter);
                    }
                }
            }
        });

        component.add(list);
		component.add(ttapp.util.Common.createMenuButton());
	},

	onTinkBoxSelect: function(target, index, e, record, eOpts) {
        Ext.Viewport.mask({
            xtype: 'loadmask',
            html: '<img src="resources/images/green-loader.png" alt="loader">'
        });
        window.selectedTinkBoxItem = record;
        Ext.Viewport.animateActiveItem('tinkchat', {type: 'slide', direction: 'left'});

				ttapp.util.Analytics.trackView('Tinkchat');
	}
});
