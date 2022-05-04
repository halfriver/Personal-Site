$(document).ready(function() {
  $("#armstrong-run").click(function() {
    var userInput = $("#armstrong-input").find("input").val().trim();
    $('#armstrong-input').find('input').val('');
    if (Math.floor(userInput)==userInput && $.isNumeric(userInput)) {
      var n_sq = [];
      var str = userInput.toString();
      var work = "";
      for (var i = 0; i < str.length; i++) {
          n_sq.push(parseInt(str[i])**str.length);
          work += parseInt(str[i]) + "<sup>" + str.length +"</sup> + ";
      }
      work = work.slice(0, -2)
      if (n_sq.reduce((a,b) => a + b, 0) == userInput) {
        $("#armstrong-results").text(userInput + " is an Armstrong number.");
        work += " = " + userInput;
      }
      else {
        $("#armstrong-results").text(userInput + " is not an Armstrong number.");
        work += " = " + n_sq.reduce((a,b) => a + b, 0);
      }
      $("#armstrong-display").html(work);
    }
    else {
      $("#armstrong-display").text("...");
      $("#armstrong-results").text("Please input a number");
    }
  });
  var input = document.getElementById("armstrong-input")
  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("armstrong-run").click();
    };
  });
});
