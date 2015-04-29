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
	        }]
		}
});