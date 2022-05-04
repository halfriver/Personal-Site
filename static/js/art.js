var hideIndicator = 410;

$(document).ready(function() {
  $(document).click(function(e) {
    var parentsClick = $(e.target).parents()
      .map(function() {
        return $(this).attr('class');
      });
    if (isModal(parentsClick)) {
      closeModal();
    }
    else {
      return;
    }
  });

  function isModal(x) {
    for (let i = 0; i < x.length; i++) {
      if (x[i].toString()=="modal") {
        for (let j = 0; j < x.length; j++) {
          if (x[j].toString().startsWith('mySlides-')) {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  }

  function openModal(tag) {
    document.getElementById("modal-" + tag).style.display = "block";
    $('.carousel-indicators').attr('hidden', true);
    $('body').css("overflow-y","hidden");
    $('[class^=carousel-control-]').css("pointer-events", "none");
  }

  function closeModal() {
    $('.modal').css("display","none");
    $('.carousel-indicators').removeAttr('hidden');
    $('body').css("overflow-y","visible");
    $('[class^=carousel-control-]').css("pointer-events", "auto");
  }

  function currentSlide(n, tag) {
    showSlides(slideIndex = n, tag);
  }

  function plusSlides(n, tag) {
    showSlides(slideIndex += n, tag);
  }

  function showSlides(n, tag) {
    var i;
    var slides = document.getElementsByClassName("mySlides-" + tag);
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
  }

  $('.card').hover(
    function() {
      $(this).find('.card-img-overlay').removeAttr('hidden');
    },
    function() {
      $(this).find('.card-img-overlay').attr('hidden', true);
    }
  );

  $('.prev').click(function() {
    plusSlides(-1, $(this).data('tag'));
  });

  $('.next').click(function() {
    plusSlides(1, $(this).data('tag'));
  });

  $('.close').click(function() {
    closeModal();
  });

  $('[id^=details]').click(function(){
    openModal($(this).data('tag'));
    currentSlide($(this).data('counter'), $(this).data('tag'));
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > hideIndicator) {
      $('.carousel-indicators').attr('hidden', true);
    }
    else {
      $('.carousel-indicators').removeAttr('hidden');
    }
  });
});
