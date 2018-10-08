jQuery(document).ready(function($) {

	var wh = $(window).height();
	$('#header').css('height', wh);

	$('.customScroll').mCustomScrollbar({
		theme:"minimal-dark",
		scrollInertia: 200,
		callbacks:{			 
	      	whileScrolling:function(){
	      		parallax(this);
	      		// scrollToOffset('#main', this);
		    }
		}
	});

	$('.sidebarButton').click(function() {
		$(this).toggleClass('active');
		$('.leftSidebar').toggleClass('open');
	});

	$(document).on("click","a[href^='#']",function(e){
	  var href=$(this).attr("href"),
	  target=$(href).parents(".mCustomScrollbar"); 
	  if(target.length){
	    e.preventDefault();
	    target.mCustomScrollbar("scrollTo",href);
	    console.log(target);
	  }
	});

	$(window).resize(function() {		
		var wh = $(window).height();
		$('#header').css('height', wh);
	});
	// function scrollToOffset(el, th){
	//     var elTop=$(el).mcs.direction;
	//     var scrolled = th.mcs.top;
	//     console.log(elTop);
	//     if (scrolled > elTop) {
	//     	$('.sidebarButton').addClass('black');
	//     }
	//     else{
	//     	$('.sidebarButton').removeClass('black');
	//     }
	// }
	function parallax(el){
	    var scrolled = el.mcs.top;
	    if ($(window).width() > 960) {
			$('#header').css('background-position-y',-(scrolled*0.5)+'px');
		};
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
