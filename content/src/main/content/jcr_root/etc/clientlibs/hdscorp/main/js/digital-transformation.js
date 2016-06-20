$(function(){
  $(document).on('click', '.share-mobile', function(e){
  $(this).toggleClass('active');
  $('.share-mobile-container').slideToggle();
  })
	targetBlank();
});
function targetBlank(){
	var targetHref = $('.footer .footer-white .iparys_inherited .links a');
	if(targetHref){
        targetHref.attr('target','_blank');
	}
}