$(document).ready(function () {

	var $heroHomepage = $('.hero-homepage');
	var $generalList = $('ul.general-list li a');
	var $listContent = $('.hiddencontent');

	if ($heroHomepage.length) {
		$('.list-content-container').on('click', '.close-hero', function() {
			$heroHomepage.siblings('.general').fadeIn(1000);
			$heroHomepage.siblings('.list-content-container').removeClass().addClass('hero-homepage list-content-container').empty();
			$heroHomepage.siblings('.list-content-container').hide();
		})

		$generalList.click(function(event){
			event.preventDefault();
			var tabClass = $(this).attr('data-class');
            var tabImageDesktop = $(this).next('.hiddencontent').find('.hero-homepage-container').attr('data-indtab');
			var tabImageMobile = $(this).next('.hiddencontent').find('.hero-homepage-container').attr('data-indmob');
			var tabHtml = $(this).next('.hiddencontent').html();
			$heroHomepage.siblings('.list-content-container').addClass(tabClass).append(tabHtml).fadeIn(1000);
			  if($(window).width() <= 500 ){
			    var tabImageMobile = $(this).next('.hiddencontent').find('.hero-homepage-container').attr('data-indmob');
				$heroHomepage.siblings('.list-content-container').css("background-image", "url(" + tabImageMobile + ")");
				$heroHomepage.siblings('.general').hide();
			  } else{
			    var tabImageDesktop = $(this).next('.hiddencontent').find('.hero-homepage-container').attr('data-indtab');
			    $heroHomepage.siblings('.list-content-container').css("background-image", "url(" + tabImageDesktop + ")");
				$heroHomepage.siblings('.general').hide();
			  }
			 
			
            //$heroHomepage.siblings('.list-content-container').css("background-image", "url(" + tabImage + ")");
			//$heroHomepage.siblings('.general').hide();
		})
	}

});

$(".ico-arrow-hm").click(function() {
    $('html, body').animate({
        scrollTop: $(".calculating-success").offset().top
    }, 1000);
});