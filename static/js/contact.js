$(document).ready(function() {
  $('#email-test').click(function() {
    $.ajax('/gen_email/',
        {
          data: {
            csrfmiddlewaretoken: window.COOKIES.csrfmiddlewaretoken,
            message: 'lorem ipsum'
          },
          type: 'POST',
        }
      )
      .done(function(data) {
        console.log("Sent");
        // setTimeout(function() {location.reload()}, 500);
      })
      .fail(function(xhr, errmsg, err) {
         alert('There is an error.');
         console.log(xhr.status + ": " + xhr.responseText);
     });
  });
});
