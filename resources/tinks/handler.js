var stage;

(function() {
   // your page initialization code here
   // the DOM will be available here
	//console.log('iframe - document ready');
	var c = document.getElementById('swiffycontainer');
	c.style.height = (window.innerHeight > 0) ? window.innerHeight : screen.height + 'px';
	c.style.width = (window.innerWidth > 0) ? window.innerWidth : screen.width + 'px';

	stage = new swiffy.Stage(c, swiffyobject, {  });
	
	//this.style.height = (window.innerHeight > 0) ? window.innerHeight : screen.height + 'px';
	//this.style.width = (window.innerWidth > 0) ? window.innerWidth : screen.width + 'px';

})();

function tt_start_animation(){
	//console.log('start animation');
    stage.start();
};
function tt_stop_animation(){
	//console.log('stop animation');
	stage.destroy();
};
