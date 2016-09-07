Ext.define('ttapp.controller.SendTo', {
    extend: 'Ext.app.Controller',
    requires: ['ttapp.config.Config'],
    config: {
        refs: {
            searchContactsField: 'searchfield[cls~=search-contacts-field]',
            btnSendTink: 'button[cls~=clsSendTink]',
            textMsg: 'textareafield[cls~=text-msg-preview]'
        },
        control: {
            'searchContactsField': {
                keyup: 'onSearchKeyUp',
                clearicontap: 'onSearchClearIconTap'
            },
            'btnSendTink': {
                tap: 'composeTink'
            },
            'sendto list toolbar button': {
                tap: 'returnToTink'
            },
            'sendto': {
                show: 'onShowSendTo'
            },
            'textMsg': {
                blur: 'hideKeyboard'
            }
        }
    },
    hideKeyboard: function(callback, scope) {
        var activeElement = document.activeElement;
        activeElement.setAttribute('readonly', 'readonly'); // Force keyboard to hide on input field.
        activeElement.setAttribute('disabled', 'true'); // Force keyboard to hide on textarea field.
        Ext.defer(function() {
            activeElement.blur();
            // Remove readonly attribute after keyboard is hidden.
            activeElement.removeAttribute('readonly');
            activeElement.removeAttribute('disabled');
        }, 100);
    },
    onShowSendTo: function(component) {

        //component.add(ttapp.util.Common.createMenuButton());
        this.selectedContact = window.contactSelected.data;
        this.setPreviewItems();
        Ext.getCmp('sendToImage').setStyle({'background':'url(resources/images/user-icon.png)'});

        var profile_url = Ext.getStore('phonecontacts').getUserImage(this.selectedContact.phone_number);

        if(!Ext.isEmpty(profile_url)) {
            Ext.getCmp('sendToImage').setStyle({'background':'url('+profile_url+')'});
        }

        Ext.select('.user-name').setHtml(window.contactSelected.data.first_name+' '+window.contactSelected.data.last_name);
    },
    setPreviewItems: function() {
        var prevTrinket = Ext.ComponentQuery.query('#previewTrinket')[0],
            secSent = Ext.ComponentQuery.query('#previewSeconds')[0];

        if (this.seconds_sent == null) {
            secSent.setHtml('--');
        } else {
            secSent.setHtml(this.seconds_sent);
        }

        Ext.getStore('trinketstore').getThumbnailPath(this.trinket_name, function(activeTrinketThumbnailPath) {
            prevTrinket.setSrc(activeTrinketThumbnailPath);
        });
    },
    clearAll: function() {
        var sf = Ext.ComponentQuery.query('searchfield[cls~=search-contacts-field]')[0];
        sf.reset();
        this.onSearchClearIconTap();
    },
    onSearchClearIconTap: function() {
        //call the clearFilter method on the store instance
        Ext.getStore('phonecontacts').clearFilter();
        Ext.getCmp('contactsListToChoose').setHeight('0px');
        Ext.getCmp('contactsListToChoose').removeCls('show-list');
    },
    returnToTink: function() {
        this.showTink();
        this.closeMe();
        Ext.ComponentQuery.query('#previewTextMsg')[0].setValue('');
    },
    onSearchKeyUp: function(field) {
        //debugger;
        var value = field.getValue(),
            store = Ext.getStore('phonecontacts');

        //first clear any current filters on thes tore
        store.clearFilter();

        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            var thisRegEx = new RegExp(value, "i");
            store.filterBy(function(record) {
                if (thisRegEx.test(record.get('first_name')) ||
                    thisRegEx.test(record.get('last_name')) ||
                    thisRegEx.test(record.get('phone_number'))) {
                    return true;
                }
                return false;
            });
        }

        if (field.getValue() === '') {
            Ext.getCmp('contactsListToChoose').setHeight('0px');
            Ext.getCmp('contactsListToChoose').removeCls('show-list');
        } else {
            Ext.getCmp('contactsListToChoose').setStore('phonecontacts');
            Ext.getCmp('contactsListToChoose').setHeight('100%');
            Ext.getCmp('contactsListToChoose').addCls('show-list');
        }
    },
    closeMe: function() {
        var cs = Ext.ComponentQuery.query('#choose-recepients')[0];
/*        setTimeout(function() {
            cs.destroy();
        }, 300);
*/
        Ext.create('Ext.util.DelayedTask', function () {
            cs.destroy();
        }).delay(300);


    },
    inviteViaSms: function() {
        Ext.getStore('profilestore').getPhoneNumber(function(from_user) {
            ttapp.util.Common.logInviteAction(from_user, this.selectedContact.phone_number);
        });

        if (Ext.os.deviceType == 'Phone') {
            var sConf = {
                number: this.selectedContact.phone_number,
                message: "Join me on tinktime. Download app at http://tinktime.com/",
                intent: "INTENT",
                success: function() {
                    Ext.Viewport.setActiveItem('tink', 'slide');
                },
                error: function() {
                    Ext.Msg.alert('Cancelled', 'Sms not sent!', Ext.emptyFn);
                }
            };
            SMS.sendSMS(sConf.number, sConf.message, sConf.success, sConf.error);
        }
    },
    composeTink: function(list, idx, target, record, evt) {
        var me = this;

        ttapp.util.Analytics.trackEvent('Send Tink', 'Sending new tink');

        Ext.getStore('profilestore').getPhoneNumber(function(from_user) {
            // no embeded html tags allowed
            var prevTextMsg = Ext.ComponentQuery.query('#previewTextMsg')[0].getValue().replace(/[<|>]/g, '');
            if (me.selectedContact.phone_number) {


                me.sendTink(from_user, me.selectedContact.phone_number, (new Date()).valueOf(), me.trinket_name,
                    prevTextMsg, me.seconds_sent, me.selectedContact.on_tinktime);

                //reset before leaving
                Ext.ComponentQuery.query('#previewTextMsg')[0].setValue('');
                me.showSplit();


                /*
                //is receipient on tinktime
                if (me.selectedContact.on_tinktime) {
                    me.sendTink(from_user, me.selectedContact.phone_number, (new Date()).valueOf(), me.trinket_name,
                        prevTextMsg, me.seconds_sent);

                    //reset before leaving
                    //me.clearAll();
                    //me.closeMe();
                    Ext.ComponentQuery.query('#previewTextMsg')[0].setValue('');
                    me.showSplit();
                }

                else {
                    //ask for user confirmation to send sms
                    Ext.Msg.confirm(
                        "Invite " + me.selectedContact.first_name+' '+ me.selectedContact.last_name,
                        "Send sms invite to (" + me.selectedContact.phone_number + ").",
                        function(buttonId) {
                            if (buttonId === 'yes') {
                                me.inviteViaSms();
                            }
                        }, me);
                }*/

                //me.clearAll();
            } else {
                Ext.Msg.alert('Recipient?', 'Please choose a recipient.', Ext.emptyFn);
            }
        });

    },
    sendTink: function(from_user, to_user, send_timestamp, trinket_name, text, seconds_sent, on_tinktime) {
        seconds_sent = seconds_sent.split(":");
        total_seconds = (parseInt(seconds_sent[0])*3600) + (parseInt(seconds_sent[1])*60) + (parseInt(seconds_sent[2]));
        total_seconds = total_seconds < 1? 1 : total_seconds;

        Ext.Ajax.request({
            url: ttapp.config.Config.getBaseURL() + '/message-queue/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            disableCaching: false,
            jsonData: {
                "from_user": from_user,
                "to_user": to_user,
                "send_timestamp": send_timestamp,
                "trinket_name": trinket_name,
                "text": text,
                "seconds_sent": total_seconds,
                "unread": true,
                "on_tinktime": on_tinktime
            },
            success: function(response) {
                console.log(response.responseText);
            }
        });
    },
    showSplit: function() {
        /*old code*/
        /*Ext.Viewport.setActiveItem('split', 'slide');*/

        Ext.Viewport.setActiveItem('tinkbox', 'slide');
        window.afterTinkSent = 1;
        //Ext.ComponentQuery.query('#options')[0].setActiveItem(2, 'slide');
    },
    showTink: function() {
      ttapp.util.Analytics.trackView('Tink');

        Ext.Viewport.animateActiveItem('tink', {
            type: 'fade'
        });
        //Ext.ComponentQuery.query('#options')[0].setActiveItem(1, 'slide');
    },
    showSendTo: function(tinkView, seconds_sent, trinket_name) {
        this.seconds_sent = seconds_sent;
        this.trinket_name = trinket_name;

        Ext.Viewport.setActiveItem('sendto', 'slide');

        ttapp.util.Analytics.trackView('Send Tink');
    }
});
