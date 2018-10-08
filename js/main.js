jQuery(document).ready(function($) {
	banderHeight();
	sidebarButton();
	parallax();

	$(window).resize(function() {
		banderHeight();
	});

	$('.customScroll').scroll(function() {
		parallax();
	});

	function parallax(){
		var scrolled = $('.customScroll').scrollTop();
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
