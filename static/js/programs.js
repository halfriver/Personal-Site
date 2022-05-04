$(document).ready(function() {
  function openModal(program) {
    $("#modal-" + program).css('display', 'block');
    $('body').css("overflow-y","hidden");
    $(".scrollable").floatingScroll("update");
  }

  function closeModal() {
    $('.modal').css("display","none");
    $('body').css("overflow-y","visible");
  }

  $(document).click(function( e ) {
    var parentsClick = [];
    $(e.target).parents().each( function() {
      if ( $(this).attr('class') ) {
        parentsClick.push( $(this).attr('class') )
      }
    });
    if ( parentsClick.includes('modal-trigger') ) {
      if ( $(e.target).hasClass( "demobtn") ) {
        $( '#nav-' + $(e.target).data('program') + '-tab' ).click();
      }
      else {
        openModal($(e.target).closest(".modal-trigger").data('program'));
      }
    }
    else if ( parentsClick.includes('modal') ) {
      if ( parentsClick.includes('modal-con') ) {
        return;
      }
      else {
        closeModal();
      }
    }
  });

  $('.close').click(function() {
    closeModal();
  });

  var modalHeight = Math.floor($(window).height()*0.95)
  $('.modal-content').css('max-height', modalHeight);
  $('.card-body').css('max-height', modalHeight*0.6);

  $(".scrollable").floatingScroll();
  $('.card-header').click(function() {
    // console.log( $('#' + $(e.target).data('language') + "-" + $(e.target).data('project')).find(".scrollable") );
    // $('#' + $(e.target).data('language') + "-" + $(e.target).data('project')).find(".scrollable").floatingScroll("update");
    $(".scrollable").floatingScroll("update");
  });
});
