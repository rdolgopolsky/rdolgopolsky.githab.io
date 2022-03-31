jQuery(document).ready(function ($) {
	var portfolioPosition;
	banderHeight();
	sidebarButton();
	parallaxJS();
	buttonColorSwitcher();

	$(window).resize(function () {
		banderHeight();
	});

	$("body").scroll(function () {
		parallaxJS();
		buttonColorSwitcher();
	});

	function parallaxJS() {
		var scrolled = $("body").scrollTop();
		var portfolioHeight = $("#portfolio").height() / 2;

		if ($(window).width() > 960) {
			$("#header").css("background-position-y", scrolled * 0.5 + "px");
		}

		if (scrolled > portfolioPosition + portfolioHeight) {
			$("#portfolio").css(
				"top",
				(scrolled - (portfolioPosition + portfolioHeight)) * 0.5 + "px"
			);
		}
	}

	function banderHeight() {
		var wh = $(window).height();
		$("#header").css("height", wh);
		portfolioPosition = $("#portfolio").offset().top;
		return portfolioPosition;
	}

	function sidebarButton() {
		$(".sidebarButton").click(function () {
			$(this).toggleClass("active");
			$(".leftSidebar").toggleClass("open");
		});
	}

	function buttonColorSwitcher() {
		var scrolled = $("body").scrollTop();

		if (scrolled > portfolioPosition) {
			$(".sidebarButton").addClass("black");
		} else {
			$(".sidebarButton").removeClass("black");
		}
	}
});
function printed_el_text(el) {
	var text = el.innerHTML,
		i = 0,
		printText = function () {
			i++;
			if (i <= text.length) {
				el.innerHTML = text.substr(0, i);
				setTimeout(printText, 20);
			}
		};
	printText();
}

printed_el_text(document.getElementById("type_text"));
