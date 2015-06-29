Ext.define('ttapp.view.PrivacyPolicy', {
	extend: 'Ext.Container',
	xtype: 'privacypolicy',
	config:{
		fullscreen: true,
		cls: 'cls-tt-tinking',	
		items: 
		  [{
            xtype: 'titlebar',
            docked:'top',           
            zIndex: 3, 
            cls:'top-bar',
            title:'Privacy Policy',
            items:[
            	{ 
                	xtype: 'button',
                	cls: 'top-btn btn-delete',
                	align: 'right',
                	handler: function (){
                		Ext.Viewport.animateActiveItem('authenticate',{type:'fade'});
                	}
                }
            ] 
	        },
            {
                xtype: 'panel',                
                html: '<iframe class="tinkanimation" src="http://tinktime.com/static/common/privacy.html"> </iframe>'
            }]
		}
});