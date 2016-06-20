$(function(){
  $(document).on('click', '.share-mobile', function(e){
  $(this).toggleClass('active');
  $('.share-mobile-container').slideToggle();
  })
});
