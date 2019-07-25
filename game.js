var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

// Change gameStarted to true when keyboard is first pressed
$(document).keypress(function(event) {

  if (!gameStarted) {
    $("#level-title").text("Level " + level);


    setTimeout(function() {
      nextSequence();
    }, 400);

    gameStarted = true;
  }
});

function checkAnswer(currentLevel) {


  if (userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]) {

    if (userClickedPattern.length === gamePattern.length) {

      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// Function to restart game
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

// Function to generate gamePattern
function nextSequence() {

  userClickedPattern = [];
  // Increment level and display updated header
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Show flash animation
  $("#" + randomChosenColor).fadeOut(150).fadeIn(150);
  // Play sound
  playSound(randomChosenColor);
}


// Check to see which button was pressed
$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length);
});


// Function to animate button click
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to play sounds
function playSound(color) {
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}
