var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var startKeyPressed = false;
var level = 0;

//Start the Game
$(document).on("keypress", function (e) {
  if (startKeyPressed == false) {
    nextSequence();
    startKeyPressed = true;
  }
});

//Create new sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var chosenColour = buttonColours[randomNumber];
  gamePattern.push(chosenColour);
  console.log("Game pattern " + gamePattern);
  $("#" + chosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(chosenColour);
}

//Check if a button is clicked
$(".btn").click(function (e) {
  var userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//Check answers
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout($("body").removeClass("game-over"), 200);
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//Restart game
function startOver() {
  level = 0;
  gamePattern = [];
  startKeyPressed = false;
}

//Plays the sound
function playSound(name) {
  var audio = new Audio("/sounds/" + name + ".mp3");
  audio.play();
}

//Add animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
