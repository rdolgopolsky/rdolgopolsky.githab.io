jQuery(document).ready(function($) {
	banderHeight();
	sidebarButton();
	parallax();
	buttonColorSwitcher();

	$(window).resize(function() {
		banderHeight();
	});

	$(document).scroll(function() {
		parallax();
		buttonColorSwitcher();
	});

	function parallax(){
		var scrolled = $(document).scrollTop();
	    if ($(window).width() > 960) {
			$('#header').css('background-position-y', (scrolled*0.5)+'px');
		};
	}

	function banderHeight(){	
		var wh = $(window).height();
		$('#header').css('height', wh);
	}

	function sidebarButton(){	
		$('.sidebarButton').click(function() {
			$(this).toggleClass('active');
			$('.leftSidebar').toggleClass('open');
		});
	}

	function buttonColorSwitcher(){
		var aboutPosition = $('#aboutMe').offset().top;
		var scrolled = $('.customScroll').scrollTop();

		if(scrolled > aboutPosition){
			$('.sidebarButton').addClass('black');
		}

		else{			
			$('.sidebarButton').removeClass('black');
		}
	}
});
function printed_el_text( el ){
	var text = el.innerHTML,
		i = 0,
		__print = function (){
			i++;
			if( i <= text.length ){
				el.innerHTML = text.substr(0, i);
				setTimeout( __print, 20 );
			}
		};
		__print();
};

printed_el_text( document.getElementById("type_text") );
