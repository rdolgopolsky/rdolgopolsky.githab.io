jQuery(document).ready(function($) {
	var coin = ['ETH', 'LTC', 'BTC'];
	var curVal = $("#currency-list option:selected").val();

	w3cSelect(coin);
	parserPrice(curVal, coin);	

	chekboxUpdate();

	function parserPrice(curVal, coin){
		for (let i=0; i<coin.length; i++) {
			$.ajax({ 
				url: 'https://apiv2.bitcoinaverage.com/indices/global/ticker/' + coin[i] + curVal,
				dataType: 'json',
				success: function (data) { 
					var price = data.changes.price,
						percent = data.changes.percent,
						ask = data.ask;

						updateInfo(price, percent, ask, i, coin);
				}, 

				error: function (jqXHR, exception) { 
					console.log('error');
				}
			}); 
		}; 

	}

	function chekboxUpdate() {
		$('.percentChange .fakeCheckbox').each(function() {
			$(this).click(function() {
				curVal = $(".select-selected").text();
				coin = [$(this).parents('.coin').attr('id')];

				$(this).toggleClass('checked');

				parserPrice(curVal, coin);
			});
		});
	}


	function updateInfo(price, percent, ask, i, coin) {
		var ask = String(ask);
		$('#'+coin[i]+' .price .value').html(ask);
		if ($('#'+coin[i]+' .fakeCheckbox').hasClass('checked')) {

			var hour = String(percent.hour),
				day = String(percent.day),
				week = String(percent.week),
				month = String(percent.month),
				coin = $('#'+coin[i]).find('.info-block');

			if (hour.indexOf('-') + 1) {
				coin.find('.hour .value').html('<span class="minus">'+hour+'%</span>');
			}
			else{
				coin.find('.hour .value').html('<span class="plus">+'+hour+'%</span>');
			}

			if (day.indexOf('-') + 1) {
				coin.find('.day .value').html('<span class="minus">'+day+'%</span>');
			}
			else{
				coin.find('.day .value').html('<span class="plus">+'+day+'%</span>');
			}

			if (week.indexOf('-') + 1) {
				coin.find('.week .value').html('<span class="minus">'+week+'%</span>');
			}			
			else{
				coin.find('.week .value').html('<span class="plus">+'+week+'%</span>');
			}

			if (month.indexOf('-') + 1) {
				coin.find('.month .value').html('<span class="minus">'+month+'%</span>');
			}
			else{
				coin.find('.month .value').html('<span class="plus">+'+month+'%</span>');
			}

		}
		else{

			var hour = String(price.hour),
				day = String(price.day),
				week = String(price.week),
				month = String(price.month),
				coin = $('#'+coin[i]).find('.info-block');

			if (hour.indexOf('-') + 1) {
				coin.find('.hour .value').html('<span class="minus">'+hour+'</span>');
			}
			else{
				coin.find('.hour .value').html('<span class="plus">+'+hour+'</span>');
			}

			if (day.indexOf('-') + 1) {
				coin.find('.day .value').html('<span class="minus">'+day+'</span>');
			}
			else{
				coin.find('.day .value').html('<span class="plus">+'+day+'</span>');
			}

			if (week.indexOf('-') + 1) {
				coin.find('.week .value').html('<span class="minus">'+week+'</span>');
			}			
			else{
				coin.find('.week .value').html('<span class="plus">+'+week+'</span>');
			}

			if (month.indexOf('-') + 1) {
				coin.find('.month .value').html('<span class="minus">'+month+'</span>');
			}
			else{
				coin.find('.month .value').html('<span class="plus">+'+month+'</span>');
			}

		}
	}


	function w3cSelect(coin) {
		var x, i, j, selElmnt, a, b, c;
		/*look for any elements with the class "custom-select":*/
		x = document.getElementsByClassName("custom-select");
		for (i = 0; i < x.length; i++) {
		  selElmnt = x[i].getElementsByTagName("select")[0];
		  /*for each element, create a new DIV that will act as the selected item:*/
		  a = document.createElement("DIV");
		  a.setAttribute("class", "select-selected");
		  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		  x[i].appendChild(a);
		  /*for each element, create a new DIV that will contain the option list:*/
		  b = document.createElement("DIV");
		  b.setAttribute("class", "select-items select-hide");
		  for (j = 0; j < selElmnt.length; j++) {
		    /*for each option in the original select element,
		    create a new DIV that will act as an option item:*/
		    c = document.createElement("DIV");
		    c.innerHTML = selElmnt.options[j].innerHTML;
		    c.addEventListener("click", function(e) {
		        /*when an item is clicked, update the original select box,
		        and the selected item:*/
		        var y, i, k, s, h;
		        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
		        h = this.parentNode.previousSibling;
		        for (i = 0; i < s.length; i++) {
		          if (s.options[i].innerHTML == this.innerHTML) {
		            s.selectedIndex = i;
		            h.innerHTML = this.innerHTML;
		            y = this.parentNode.getElementsByClassName("same-as-selected");
		            for (k = 0; k < y.length; k++) {
		              y[k].removeAttribute("class");
		            }
		            this.setAttribute("class", "same-as-selected");

		            parserPrice(h.innerHTML, coin);

		            break;
		          }
		        }
		        h.click();
		    });
		    b.appendChild(c);
		  }
		  x[i].appendChild(b);
		  a.addEventListener("click", function(e) {
		      /*when the select box is clicked, close any other select boxes,
		      and open/close the current select box:*/
		      e.stopPropagation();
		      closeAllSelect(this);
		      this.nextSibling.classList.toggle("select-hide");
		      this.classList.toggle("select-arrow-active");
		    });
		}
		function closeAllSelect(elmnt) {
		  /*a function that will close all select boxes in the document,
		  except the current select box:*/
		  var x, y, i, arrNo = [];
		  x = document.getElementsByClassName("select-items");
		  y = document.getElementsByClassName("select-selected");
		  for (i = 0; i < y.length; i++) {
		    if (elmnt == y[i]) {
		      arrNo.push(i)
		    } else {
		      y[i].classList.remove("select-arrow-active");
		    }
		  }
		  for (i = 0; i < x.length; i++) {
		    if (arrNo.indexOf(i)) {
		      x[i].classList.add("select-hide");
		    }
		  }
		}
		/*if the user clicks anywhere outside the select box,
		then close all select boxes:*/
		document.addEventListener("click", closeAllSelect);
	}
});