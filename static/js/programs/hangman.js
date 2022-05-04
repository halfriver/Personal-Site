$(document).ready(function() {
  var gallowsHTML;
  var letterDict;
  var status;
  var wrong;
  var word;
  var penalty;
  var bodyComp = ["o", "|", "\\", "/", "/", "\\"];
  var body;

  $('#hangman-start').click(function() {
    // read dictionary doc and select a word
    $.ajax('hangman-dict/',
        {
          data: {
            csrfmiddlewaretoken: window.COOKIES.csrfmiddlewaretoken
          },
          type: 'GET',
        }
      )
      .done(function(data) {
        word = data;
        startGame(word)
      })
      .fail(function(xhr, errmsg, err) {
         alert('There is an error.');
         console.log(xhr.status + ": " + xhr.responseText);
     });
  });

  function startGame(word) {
    // reset
    penalty = 0
    body = [" ", " ", " ", " ", " ", " "];
    status = "";
    letterDict = {};
    wrong = "";
    $('#hangman-error').text("")
    // display initial gallows
    printGallows(body)
    // display word length in "_" and show place for unsuccessful guesses
    for (let i = 0; i < word.length; i++) {
      status += "_";
      if (!(word[i] in letterDict)) {
        letterDict[word[i]] = [i];
      }
      else {
        letterDict[word[i]].push(i)
      }
    };
    printStatus()
    $("#hangman-wrong").html("Wrong guesses: [" + wrong + " ]");
    $("#hangman-input").removeAttr('hidden');
  }

  $("#hangman-run").click(function() {
    var userInput = $("#hangman-guess").val().trim().toLowerCase();
    $('#hangman-guess').val('');
    // input handling
    var lettersOnly = /^[a-zA-Z]+$/;
    if(userInput.match(lettersOnly) && userInput.length == 1) {
      // if the guess has already been made
      if (wrong.includes(userInput) || status.includes(userInput)) {
        $('#hangman-error').text("You have already guessed this.")
      }
      else {
        $('#hangman-error').text("");
        // if guess is correct
        if (userInput in letterDict) {
          for (value in letterDict[userInput]) {
            status[letterDict[userInput][value]*2] = userInput;
          }
          stitchStatus(status, letterDict[userInput], userInput)
        }
        // if guess is incorrect
        else {
          wrong += " " + userInput;
          body[penalty] = bodyComp[penalty]
          penalty += 1
          printGallows(body)
          $("#hangman-wrong").html("Wrong guesses: [" + wrong + " ]");
        }
      }
    }
    else{
        $('#hangman-error').text("Please enter a single letter.");
    }
    // win/lose conditions
    if (penalty == 6) {
      loseGame();
    }
    else if (!(status.includes("_"))) {
      $("#hangman-input").attr('hidden', true);
      $('#hangman-error').html("<div style='color:green'>Congrats, you win! Hit 'Start Game' to play again.</div>");
    }
  });

  function printGallows(body) {
    var gallows = ["   _____      <br>",
                   "  |     |     <br>",
                   "  |     " + body[0] + "     <br>",
                   "  |    " + body[2] + body[1] + body[3] + "    <br>",
                   "  |     " + body[1] + "     <br>",
                   "  |    " + body[4] + " " + body[5] + "    <br>",
                   " _|__         <br>",
                   "|    |______  <br>",
                   "|           | <br>",
                   "|___________| "];
    var gallowsHTML = "";
    for (let i = 0; i < gallows.length; i++) {
      gallowsHTML += gallows[i].replaceAll(" ", "&#160;")
    };
    $("#hangman-gallows").html(gallowsHTML);
  }

  function printStatus() {
    var statusPrint = "";
    for (let character = 0; character < status.length; character++) {
      statusPrint += status[character] + " ";
    }
    $("#hangman-status").html("<br>" + statusPrint);
  }

  function stitchStatus(stat, index, letter) {
    var statusPrint = "";
    // build new status
    for (let character = 0; character < stat.length; character++) {
      if (index.includes(character)) {
        statusPrint += letter;
      }
      else {
        statusPrint += stat[character];
      }
    }
    // stitch status into proper format
    status = statusPrint;
    printStatus()
  }

  // end the game, print word
  function loseGame() {
    status = word;
    printStatus();
    $("#hangman-input").attr('hidden', true);
    $('#hangman-error').text("Sorry, you lose! Hit 'Start Game' to play again.");
  };

  // hit enter to submit guess
  var input = document.getElementById("hangman-guess")
  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("hangman-run").click();
    };
  });
});
