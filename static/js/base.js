$(document).ready(function() {
  var w = window.innerWidth;

  if (!sessionStorage.lang) {
    sessionStorage.lang = "eng";
  }

  var collapseStart = 120;
  var atTop = true;
  var navbarInitialHeight = 64;


  if ($(window).scrollTop() > collapseStart){
    $('nav').attr('style', 'padding: 0px !important;');
    if ($("#darkmode")[0].checked) {
      // dark
      $('nav').css('background-color', 'rgba(13, 28, 28, 1)');
    } else {
      // light
      $('nav').css('background-color', 'rgba(5, 39, 32, 1)');
    }
  }

  // Correct navbar styles when user scrolls
  $(window).scroll(function() {
    calculateNav();
  });

  // Correct navbar styles when window is resized
  $(window).resize(function() {
    calculateNav();
  });

  // Correct navbar styles when nav-toggler is clicked
  $('.navbar-toggler').click(function() {
    calculateNav();

    if ($("nav").height() > navbarInitialHeight && atTop) {
      if ($("#darkmode")[0].checked) {
        $('nav').css('background-color', 'rgba(13, 23, 28, 0.65)');
      } else {
        $('nav').css('background-color', 'rgba(54, 96, 117, 0.45)');
      }
      $('#external-links').removeClass('nav-box-collapse');
    }
    else {
      if ($("#darkmode")[0].checked) {
        $('nav').css('background-color', 'rgba(13, 23, 28, 1)');
      } else {
        $('nav').css('background-color', 'rgba(54, 96, 117, 1)');
      }
      $('#external-links').addClass('nav-box-collapse');
    }
  });

  // Make navbar changes
  function calculateNav() {
    // if the user has scrolled past where the collapse should start
    if ($(document).scrollTop() > collapseStart){
      // then the navbar collapses and darkens
      $('nav').attr('style', 'padding: 2px 0px !important;');
      if ($("#darkmode")[0].checked) {
        $('nav').css('background-color', 'rgba(13, 23, 28, 1)');
      } else {
        $('nav').css('background-color', 'rgba(54, 96, 117, 1)');
      }
      $('#external-links').addClass('nav-box-collapse');
      atTop = false;
    }

    else{
      // if the navbar's height is larger than the initial height
      if ($("nav").height() > navbarInitialHeight) {
        // shrink and darken
        $('nav').attr('style', 'padding: 10px 0px !important');
        if ($("#darkmode")[0].checked) {
          $('nav').css('background-color', 'rgba(13, 23, 28, 1)');
        } else {
          $('nav').css('background-color', 'rgba(54, 96, 117, 1)');
        }
        $('#external-links').addClass('nav-box-collapse');
      } else {
        // expand and lighten
        $('nav').attr('style', 'padding: 10px 0px !important');
        if ($("#darkmode")[0].checked) {
          $('nav').css('background-color', 'rgba(13, 23, 28, 0.65)');
        } else {
          $('nav').css('background-color', 'rgba(54, 96, 117, 0.55)');
        }
        $('#external-links').removeClass('nav-box-collapse');
      }
      atTop = true;
    }
  }

  // when Japanese is selected, swap language on navbar titles
  $('.lang-display').parent().hover(function() {
    $(this).find('.jpn-display').removeClass('d-none');
    $(this).find('.eng-display').addClass('d-none');
  }, function() {
    $(this).find('.eng-display').removeClass('d-none');
    $(this).find('.jpn-display').addClass('d-none');
  }
  );

  // on toggling to English
  $('#eng-toggle').click(function() {
    // if language is already set to English, do nothing;
    // else: refresh page and update session
    if (sessionStorage.lang == "eng") {
      return;
    }
    sessionStorage.lang = "eng";
    update_session($("#darkmode")[0].checked, "eng");
  });

  // on toggling to Japanese
  $('#jpn-toggle').click(function() {
    // if language is already set to Japanese, do nothing;
    // else: refresh page and update session
    if (sessionStorage.lang == "jpn") {
      return;
    }
    // update front-end
    sessionStorage.lang = "jpn";
    // update back-end
    update_session($("#darkmode")[0].checked, "jpn");
  });

  $('#darkmode').click(function() {
    // change to sun if going from light > dark
    if ($("#darkmode")[0].checked) {
      $(this).siblings().removeClass('slider-light').addClass('slider-dark');
    } else {
      $(this).siblings().removeClass('slider-dark').addClass('slider-light');
    }

    // update back-end
    update_session($("#darkmode")[0].checked, sessionStorage.lang);
  });

  function update_session(darkmode, lang) {
    // console.log(darkmode, lang);
    $.ajax('/update_session/',
        {
          data: {
            csrfmiddlewaretoken: window.COOKIES.csrfmiddlewaretoken,
            lang: lang,
            darkmode: darkmode
          },
          type: 'POST',
        }
      )
      .done(function(data) {
        // console.log("Done");
        setTimeout(function() {location.reload()}, 500);
      })
      .fail(function(xhr, errmsg, err) {
         alert('There is an error.');
         console.log(xhr.status + ": " + xhr.responseText);
     });
  }

  // initialize tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  })

  // update footer copyright year
  $('.foot span').text(new Date().getFullYear());
});
