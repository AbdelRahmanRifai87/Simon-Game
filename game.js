var gamePattern = [];
var userClickedPattern = [];
var buttonsArray = ["green", "red", "yellow", "blue"];
var level = 1;
var started = true;

$(document).keydown(function () {
  if (started) {
   
   
  
    nextSequence();
    
    started = false;
    $("#level-title").text("Level " + level);
    $(".btn").click(function (event) {
      event.stopImmediatePropagation();

      var userChosenColor = $(this).attr("id");
      userClickedPattern.push(userChosenColor);
      
      
      $("#" + $(this).attr("id"))
        .fadeOut(100)
        .fadeIn(100);
      playSound($(this).attr("id"));
      animatePress("#" + $(this).attr("id"));

      if(Check(userClickedPattern.length - 1) === true){
         
         if (userClickedPattern.length === gamePattern.length) {
            
            setTimeout(function () {
              nextSequence();
              userClickedPattern = [];
            }, 1000);
            level++;
            $("#level-title").text("Level " + level);
          }
      }
      
      else if(Check(level-1) === false){
        
         gamePattern=[];
   userClickedPattern=[];

        $(document).addClass("game-over");
        playSound("wrong");
        gameOver();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        level = 1;
        started = true;
       
      }
     
    });
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColour = buttonsArray[randomNumber];
  gamePattern.push(randomChoosenColour);
  $("#" + randomChoosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChoosenColour);
  animatePress("#" + randomChoosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(button) {
  $(button).addClass("pressed");
  setTimeout(function () {
    $(button).removeClass("pressed");
  }, 100);
}
function Check(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    
    return true;
  } else {
    
    return false;
  }
}
function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function (){
   $("body").removeClass("game-over");

  },100);
}
