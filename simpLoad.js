(function($){

	$.fn.simpLoad = function(toDo){
		
		var self = this;
		
		//self.css('box-sizing','border-box');
		
		if(toDo == "start"){
			
			//create HTML markup necessary for loading animation
			var loadingMarkup = '<div class="loading"><svg id="clock" width="100%" height="100%">';
				loadingMarkup += '<circle cx="50%" cy="50%" r="25" stroke="#dfdfdf" stroke-width="6" fill="none"/>';
				loadingMarkup += '<polyline class="minHand" x="10" y="10" fill="none" stroke="#dfdfdf" stroke-width="6" points="" />';
				loadingMarkup += '<polyline class="hourHand" x="10" y="10" fill="none" stroke="#dfdfdf" stroke-width="6" points="" />';
				loadingMarkup += '<circle cx="50%" cy="50%" r="3" fill="#dfdfdf" /></svg>';
			
			self.prepend(loadingMarkup);
			self.append('</div><!-- END Loading div -->');
			
			//Create styles
			if(self.css('position') != 'absolute'){
				self.css('position','relative');
			}
			
			var styleLoading = $('<style>.loading {background: rgba(10,10,10,0); position:absolute; height:100%; width:100%; -webkit-transform:scale(1.2);-moz-transform:scale(1.2);-ms-transform:scale(1.2);-o-transform:scale(1.2);transform:scale(1.2); z-index:1000; transition:all 0.2s ease-out;}</style>');
			$('html > head').append(styleLoading);
			
			var styleInit = $('<style>.loading.init {background: rgba(10,10,10,0.3);-webkit-transform: scale(1);-moz-transform: scale(1);-ms-transform: scale(1);-o-transform: scale(1);transform: scale(1);}</style>');
			$('html > head').append(styleInit);
			
			//initialize loading animation
			setTimeout(function(){
				self.find('.loading').addClass('init');
				animate();
			},100);
			
			//Define variables for animation
			var clock = $('.loading'),
				mHand = document.getElementsByClassName('minHand')[0],
				hHand = document.getElementsByClassName('hourHand')[0],
				
				//Center coordinates
				CENTER_X = parseInt(clock.width()) / 2,
				CENTER_Y = parseInt(clock.height()) / 2,
				CENTER = CENTER_X + ',' + CENTER_Y,
				
				//Radii
				RM = 20, //radius of the minute hand
				RH = 14, //radius of the hour hand
				
				PI = 3.14159,
				
				//Angles
				PHI_M = 161.8, //Minute hand angle
				PHI_H = 161.8; //Hour hand angle
			
			//RequestAminFrame by Paul Irish
			//http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
			window.requestAnimFrame = (function(){
				return	window.requestAnimationFrame		||
						window.webkitRequestAnimationFrame	||
						window.mozRequestAnimationFrame		||
						window.oRequestAnimationFrame		||
						window.msRequestAnimationFrame		||
						function(callback, element){
							return window.setTimeout(callback, 1000 / 60);
						};
			})();
			
			window.cancelRequestAnimFrame = ( function() {
				return window.cancelAnimationFrame				||
					window.webkitCancelRequestAnimationFrame	||
					window.mozCancelRequestAnimationFrame		||
					window.oCancelRequestAnimationFrame			||
					window.msCancelRequestAnimationFrame		||
					clearTimeout
			} )();
			
		} else if (toDo == "stop"){
			
			self.find('.loading').removeClass('init');
			setTimeout(function(){
				self.find('.loading').remove();
				cancelRequestAnimFrame(raf);
			}, 200);
			
		}
		
		
		function drawClock(){
			//Calculate minute hand Coordinates
			var min_x = parseInt(CENTER_X + (Math.cos(PHI_M) * RM));
			var min_y = parseInt(CENTER_Y + (Math.sin(PHI_M) * RM));
			
			//Calculate hour hand Coordinates
			var hour_x = parseInt(CENTER_X + (Math.cos(PHI_H) * RH));
			var hour_y = parseInt(CENTER_Y + (Math.sin(PHI_H) * RH));
			
			var CENTER_X_FIX = CENTER_X + 0.1;
			var CENTER_Y_FIX = CENTER_Y + 0.1;
			var CENTER_FIX = CENTER_X + ',' + CENTER_Y;
			
			//Assign Coordinates to the polyline objects
			var mCoords = min_x + ',' + min_y + ' ' + CENTER;
			var hCoords = hour_x + ',' + hour_y + ' ' + CENTER;
			mHand.setAttribute('points', mCoords);
			hHand.setAttribute('points', hCoords);
			
			//Change minute hand angle
			PHI_M = PHI_M + 0.1;
			if(PHI_M == 361) PHI_M = 1;
			//Change hour hand angle 
			PHI_H = PHI_H + 0.04;
			if(PHI_H == 361) PHI_H = 1;
		}
		
		function animate() {
			raf = requestAnimFrame( animate );
			drawClock();
		}
	}

})(jQuery);
