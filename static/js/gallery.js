$(document).ready(function() {

  // show card title
  $('.card').hover(
    function() {
      $(this).find('.card-img-overlay').first().removeClass('d-none');
    }, function() {
      $(this).find('.card-img-overlay').addClass('d-none');
    }
  );

  // recalibrate Masonry to respond to newly selected tabs
  $('.gallery-cat').click(function() {
    setTimeout(function() {
      $('.mason-grid').masonry({
        transitionDuration: 300
      });
      // window.dispatchEvent(new Event('resize'));
      console.log("recalibrate");
    }, 200);
  });
});
