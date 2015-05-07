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
            'sendto list': {
                itemtap: 'saveTappedContact'              
            },
            'sendto list toolbar button': {
                tap: 'returnToTink'
            },
            'sendto': {
                show: 'onShowSendTo'
            },
            textMsg: {
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
    onShowSendTo: function(){
        this.setPreviewItems();
    },
    setPreviewItems: function(){
        var prevTrinket = Ext.ComponentQuery.query('#previewTrinket')[0];
        var secSent = Ext.ComponentQuery.query('#previewSeconds')[0];
        console.log(this.seconds_sent);
        if(this.seconds_sent == null){
            secSent.setHtml('--');
        }
        else{
            secSent.setHtml(this.seconds_sent+"s");
        }

        var activeTrinketThumbnailPath = Ext.getStore('trinketstore').getThumbnailPath(this.trinket_name);
        prevTrinket.setSrc(activeTrinketThumbnailPath);
    },
    saveTappedContact: function(list, idx, target, record, evt){
        this.fullName = record.data.first_name + ' '+ record.data.last_name;
        this.phoneNumber = record.data.phone_number;
        this.getSearchContactsField().setValue(this.fullName);
        setTimeout(function() {
            Ext.getStore('phonecontacts').clearFilter();
            Ext.getCmp('contactsListToChoose').setStore('');
            Ext.getCmp('contactsListToChoose').setHeight('0px');    
            Ext.getCmp('contactsListToChoose').removeCls('show-list');
        },
        10);
    },
    clearAll: function(){
        var sf = Ext.ComponentQuery.query('searchfield[cls~=search-contacts-field]')[0];
        sf.reset();
        this.onSearchClearIconTap();
    },
    onSearchClearIconTap: function() {
        //call the clearFilter method on the store instance
        Ext.getStore('phonecontacts').clearFilter();
        Ext.getCmp('contactsListToChoose').setStore('');
        Ext.getCmp('contactsListToChoose').setHeight('0px');
        Ext.getCmp('contactsListToChoose').removeCls('show-list');
    },
    returnToTink: function(){
        this.showTink();
        this.closeMe();
    },
    onSearchKeyUp : function(field){
        //debugger;
        var value = field.getValue(),
            store = Ext.getStore('phonecontacts');

        //first clear any current filters on thes tore
        store.clearFilter();
        if (field.getValue() == '') {
            Ext.getCmp('contactsListToChoose').setStore('');
            Ext.getCmp('contactsListToChoose').setHeight('0px');
            Ext.getCmp('contactsListToChoose').removeCls('show-list');
            // $(".search-list-sec .x-dock.x-unsized>.x-dock-body").css({"display":"none"});
        } else {
            Ext.getCmp('contactsListToChoose').setStore('phonecontacts');
            Ext.getCmp('contactsListToChoose').setHeight('100%'); 
            // $(".search-list-sec .x-dock.x-unsized>.x-dock-body").css({"background":"rgba(233,233,233,0.85)","display":"block"} );
            Ext.getCmp('contactsListToChoose').addCls('show-list');
        }
        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            //the user could have entered spaces, so we must split them so we can loop through them all
            var searches = value.split(' '),
                regexps = [],
                i;

            //loop them all
            for (i = 0; i < searches.length; i++) {
                //if it is nothing, continue
                if (!searches[i]) continue;

                //if found, create a new regular expression which is case insenstive
                regexps.push(new RegExp(searches[i], 'i'));
            }

            //now filter the store by passing a method
            //the passed method will be called for each record in the store
            store.filter(function(record) {
                var matched = [];

                //loop through each of the regular expressions
                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch;
                    if ( record.get('first_name') ){
                        didMatch = record.get('first_name').match(search)
                    }
                    if ( record.get('last_name') && !didMatch ){
                        didMatch = record.get('last_name').match(search)
                    }
                    if ( record.get('phone_number') && !didMatch){
                        didMatch = record.get('phone_number').match(search)
                    }

                    //if it matched the first or last name, push it into the matches array
                    matched.push(didMatch);
                }

                //if nothing was found, return false (dont so in the store)
                if (regexps.length > 1 && matched.indexOf(false) != -1) {
                    return false;
                } else {
                    //else true true (show in the store)
                    return matched[0];
                }
            });

        }
    },
    closeMe: function(){
        var cs = Ext.ComponentQuery.query('#choose-recepients')[0];
        setTimeout(function(){
            cs.destroy();
            console.log("destroy");     
        },300);
        
    },
    inviteViaSms: function(){
        //console.log(this.phoneNumber);
        if (Ext.os.deviceType == 'Phone'){
            var sConf = {
                number: this.phoneNumber,
                message: "Join me on tinktime. Download app at http://tinktime.com/",
                intent: "INTENT",
                success: function(){ 
                    Ext.Viewport.setActiveItem('split','slide');
                },
                error: function(){ 
                    Ext.Msg.alert('Cancelled', 'Sms not sent!', Ext.emptyFn); 
                }
            }
            sms.send(sConf.number, sConf.message, sConf.intent, sConf.success, sConf.error);
        }
    },
    composeTink : function(list, idx, target, record, evt){
        var from_user = Ext.getStore('profilestore').getPhoneNumber();
        var prevTextMsg = Ext.ComponentQuery.query('#previewTextMsg')[0];

        if( this.phoneNumber){
            //is receipient on tinktime
            if (Ext.getStore('phonecontacts').isOnTinkTime(this.phoneNumber)){

                this.sendTink(from_user, this.phoneNumber, (new Date()).valueOf(), 
                    this.trinket_name, prevTextMsg.getValue(), this.seconds_sent);

                //reset before leaving
                this.clearAll();
                this.closeMe();
                this.showSplit();
                
            }
            else{
                
                //ask for user confirmation to send sms
                Ext.Msg.confirm(
                    "Invite?",
                    "Your friend is not using tinktime. Invite your friend to view this tink!",
                    function(buttonId) {
                        if (buttonId === 'yes') {
                            this.inviteViaSms();
                        }
                    }, this
                );

            }

            //clear phonenumber
            this.phoneNumber = null;
        }
        else{
            Ext.Msg.alert('Receiver?', 'Please choose a recipient.', Ext.emptyFn);
        }
    },
    sendTink: function(from_user, to_user, send_timestamp, trinket_name, text, seconds_sent){
          Ext.Ajax.request({
                            url:  ttapp.config.Config.getBaseURL() + '/message-queue/',
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            disableCaching: false,
                            jsonData: {
                                "from_user" : from_user,
                                "to_user" : to_user, 
                                "send_timestamp": send_timestamp, 
                                "trinket_name": trinket_name, 
                                "text" : text,
                                "seconds_sent": seconds_sent,
                                "unread": true
                            },

                            success: function(response) {
                                console.log(response.responseText);
                            }
                        });
    },
    showSplit: function(){
        Ext.Viewport.setActiveItem('split','slide');
        //Ext.ComponentQuery.query('#options')[0].setActiveItem(2, 'slide');
    },
    showTink: function(){
        Ext.Viewport.animateActiveItem('tink',{type:'fade'});
        //Ext.ComponentQuery.query('#options')[0].setActiveItem(1, 'slide');
    },
    showSendTo: function(tinkView, seconds_sent, trinket_name){
        this.seconds_sent = seconds_sent;
        this.trinket_name = trinket_name;

        Ext.Viewport.setActiveItem('sendto','slide');
    }
});
