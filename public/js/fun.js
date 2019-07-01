$(window).load(function() {
	$(".col-xs-12").twentytwenty();
});


//math game
var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

document.getElementById("startreset").onclick = function(){



	if(playing == true){

		location.reload(); 

	}else{

		playing = true;


		score = 0;
		document.getElementById("scorevalue").innerHTML = score;


		show("timeremaining");
		timeremaining = 60;
		document.getElementById("timeremainingvalue").innerHTML = timeremaining;


		hide("gameOver");

		document.getElementById("startreset").innerHTML = "Reset Game";



		startCountdown();


		generateQA();
	}

}

for(i=1; i<5; i++){
	document.getElementById("box"+i).onclick = function(){

		if(playing == true){
			if(this.innerHTML == correctAnswer){


				score++;
				document.getElementById("scorevalue").innerHTML = score;
				hide("wrong");
				show("correct");
				setTimeout(function(){
					hide("correct");   
				}, 1000);


				generateQA();
			}else{

				hide("correct");
				show("wrong");
				setTimeout(function(){
					hide("wrong");   
				}, 1000);
			}
		}
	}   
}
function startCountdown(){
	action = setInterval(function(){
		timeremaining -= 1;
		document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){// game over
        	stopCountdown();
        	show("gameOver");
        	document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";   
        	hide("timeremaining");
        	hide("correct");
        	hide("wrong");
        	playing = false;
        	document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);    
}



function stopCountdown(){
	clearInterval(action);   
}


function hide(Id){
	document.getElementById(Id).style.display = "none";   
}



function show(Id){
	document.getElementById(Id).style.display = "block";   
}

function generateQA(){
	var x = 1+ Math.round(9*Math.random());
	var y = 1+ Math.round(9*Math.random());
	correctAnswer = x*y;
	document.getElementById("question").innerHTML = x + "x" + y;
	var correctPosition = 1+ Math.round(3*Math.random());
	document.getElementById("box"+correctPosition).innerHTML = correctAnswer; 

	var answers = [correctAnswer];

	for(i=1; i<5; i++){
		if(i != correctPosition) {
			var wrongAnswer;
			do{
				wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random()));
			}while(answers.indexOf(wrongAnswer)>-1)
			document.getElementById("box"+i).innerHTML = wrongAnswer;
			answers.push(wrongAnswer);
		}
	}
}

//dice game
function diceGame(){
	var randomNumber1 = Math.floor(Math.random() * 6 ) + 1;

	var randomDiceImage = "dice" + randomNumber1 + ".png";

	var randomImageSource = "images/" + randomDiceImage;


	var image1 = document.querySelectorAll(".dice img")[0];
	console.log(image1)

	image1.setAttribute("src", randomImageSource);

	var randomNumber2 = Math.floor(Math.random() * 6 ) + 1;

	var randomImageSource2 = "../images/dice" + randomNumber2 + ".png";

	document.querySelectorAll(".dice img")[1].setAttribute("src", randomImageSource2);

        // if player one is wins
        if(randomNumber1 > randomNumber2) {
        	document.getElementById("win").innerHTML = "Player1 is Win!";
        }else if(randomNumber2 > randomNumber1) {
        	document.getElementById("win").innerHTML = "Player2 is Win!";
        }else{
        	document.getElementById("win").innerHTML = "Draw!";
        }
    }

//fruits game


var isPlaying=false;
var fruits=["http://www.pngmart.com/files/1/Banana-Fruit-PNG.png","https://pre00.deviantart.net/6c5b/th/pre/i/2012/041/9/3/pear_vector_by_silver_wolf_studios-d4paumq.png","http://www.freepngimg.com/download/fruit/5-2-fruit-free-png-image.png","http://www.pngpix.com/wp-content/uploads/2016/03/Watermelon-PNG-Image.png","https://vignette.wikia.nocookie.net/epicrapbattlesofhistory/images/5/57/Pineapple-2.png/revision/latest?cb=20160703145656","http://www.freepngimg.com/thumb/strawberry/1-strawberry-png-images-thumb.png","http://www.pngpix.com/wp-content/uploads/2016/02/Lemon-PNG-image.png","http://pngimagesfree.com/Fruit/Mix-fruit-png/fruit-basket_png_one.png","http://pngimagesfree.com/Fruit/Grapes-png/Thumb/jind_grapes_png.png"]
var score;
var lives=3;
var fallcount;
var movefruit;
$('.start1').on('click',function(){
	if(isPlaying==true){
		score=0;
		isPlaying=false;
		lives=3;
		clearInterval(movefruit);
		$('#life').html("");
		$('#score1').html(score);
		$('.start1').html('start');
		$('.fruit').hide();
		$("#getfruit").attr("src","");
	}else{
		score=0;
		lives=3;
		isPlaying=true;
		$('#score1').html(score);
		$('.start1').html('reset');
		$('.gameover1').hide();
		showLives();
		getFruits();
	}
})
$("#getfruit").mouseover(function(){
	score++;
	$("#score1").html(score);
	$("#sound")[0].play();
	clearInterval(movefruit);
	$("#getfruit").hide("explode",500);
	setTimeout(getFruits,500);
});

function showLives(){
	$("#life").empty();
	for(var i=0;i<lives;i++){
		$('#life').append('<img src="../images/heart.png" width="5%">');
	}
}
var fruitnum;
function getFruits(){
	$('.fruit').show();
	fruitnum=Math.floor(Math.random()*9);
	console.log(fruitnum)
	$("#getfruit").attr("src",fruits[fruitnum]);
	$("#getfruit").css({'top':-40,'left':Math.random()*($('.fruitbox').width()-100)})
	fallcount=Math.floor(Math.random()*5)+1;
	movefruit=setInterval(function(){
		$("#getfruit").css('top',$("#getfruit").position().top+fallcount);
		if($("#getfruit").position().top>$(".fruitbox").height()){
			if(lives>1){
				fruitnum=Math.floor(Math.random()*4);
				console.log(fruitnum)
				$("#getfruit").attr("src",fruits[fruitnum]);
				$("#getfruit").css({'top':-40,'left':Math.random()*($('.fruitbox').width()-100)})
				fallcount=Math.floor(Math.random()*5)+1;
				lives--;
				showLives();
			}else{
				lives=0;
				showLives();
				isPlaying=false;
				$('.start1').text('start')
				clearInterval(movefruit);
				$('.gameover1').show();
				$('#finalscore').html(score);
			}
		}
	},10);

}

function calculate(){
	var loveScore = Math.random() * 100;
	loveScore = Math.floor(loveScore) + 1;
	var newName1 = document.getElementById("loveName1").value;
	var newName2 = document.getElementById("loveName2").value;
	document.getElementById("score2").innerHTML = newName1 + " You 💝 " + loveScore + "%" + " to " + newName2;
}


//drum kit
// JavaScript Drum Kit App

{
	const playingClass = 'playing',
		crashRide = document.getElementById('crash-ride'),
		hiHatTop = document.getElementById('hihat-top');

	const animateCrashOrRide = () => {
		crashRide.style.transform = 'rotate(0deg) scale(1.5)';
	};

	const animateHiHatClosed = () => {
		hiHatTop.style.top = '171px';
	};

	const playSound = e => {
		const keyCode = e.keyCode,
			keyElement = document.querySelector(`div[data-key="${keyCode}"]`);

		if(!keyElement) return;

		const audioElement = document.querySelector(`audio[data-key="${keyCode}"]`);
		audioElement.currentTime = 0;
		audioElement.play();

		switch(keyCode) {
			case 69:
			case 82:
				animateCrashOrRide();
				break;
			case 75:
				animateHiHatClosed();
				break;
		}

		keyElement.classList.add(playingClass);
	};

	const removeCrashRideTransition = e => {
		if(e.propertyName !== 'transform') return;

		e.target.style.transform = 'rotate(-7.2deg) scale(1.5)';
	};

	const removeHiHatTopTransition = e => {
		if(e.propertyName !== 'top') return;

		e.target.style.top = '166px';
	};	

	const removeKeyTransition = e => {
		if(e.propertyName !== 'transform') return;

		e.target.classList.remove(playingClass)
	};

	const drumKeys = Array.from(document.querySelectorAll('.key'));

	drumKeys.forEach(key => {
		key.addEventListener('transitionend', removeKeyTransition);
	});

	crashRide.addEventListener('transitionend', removeCrashRideTransition);
	hiHatTop.addEventListener('transitionend', removeHiHatTopTransition);

	window.addEventListener('keydown', playSound);
}

//simon game
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];


var started = false;
var level = 0;


function nextSequence() 
{
        // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
        userClickedPattern = [];
        // 11
        level++;
        $("#level-title").text("Level " + level);

        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

        playSound(randomChosenColour);
    }




    $(".btn").click(function(){
    	var userChosenColour = $(this).attr("id");
    	userClickedPattern.push(userChosenColour);
    	playSound(userChosenColour);
    	animatePress(userChosenColour);

    	checkAnswer(userClickedPattern.length-1);
    });



    function playSound(name){
    	var audio = new Audio("audio/"+name+".mp3");
    	audio.play();
    }


    function animatePress(currentColour){
    	$("#"+currentColour).addClass("pressed");

    	setTimeout(function(){
    		$("#"+currentColour).removeClass("pressed");
    	},100);

    	playSound(currentColour);
    }

    $(document).keypress(function(){
    	if(!started){
    		$("#level-title").text("Level " + level);
    		nextSequence();
    		started = true;
    	}
    })


    function checkAnswer(currentLevel){

    // Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success",
    //  otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    	console.log("success");
        // If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
          	nextSequence();
          }, 1000);
      }

  } else {
  	console.log("wrong");
  	playSound("wrong");
  	$("body").addClass("game-over1");
  	setTimeout(function(){
  		$("body").removeClass("game-over1");
  	}, 200);
  	$("#level-title").text("Game Over, Press Any Key to Restart");
  	startOver();
  }
}



function startOver(){
	level = 0;
	gamePattern = [];
	started = false;
}



(function() {
	const BTN_START = document.querySelector(".start");
	const BTN_PAUSE = document.querySelector(".pause");
	const BTN_RESET = document.querySelector(".reset");
	const BTN_LAP = document.querySelector(".lap");
	const LIST_LAPS = document.querySelector(".laps");
	const BTN_CLEAR = document.querySelector(".clear");
	const TIME_DISPLAY = document.querySelector(".time");

	let ms, s, m, h;

	BTN_START.addEventListener("click", e => {
		e.preventDefault();
		if (SETTINGS.playing === false) {
			SETTINGS.playing = true;
			SETTINGS.timerId = window.requestAnimationFrame(startTimer);
		}

    //Resuming play
    if (SETTINGS.progress !== 0) {
    	SETTINGS.start = performance.now() - SETTINGS.progress;
    }
});

	BTN_PAUSE.addEventListener("click", pauseTimer);
	BTN_RESET.addEventListener("click", resetTimer);
	BTN_LAP.addEventListener("click", recordLap);
	BTN_CLEAR.addEventListener("click", e => {
		e.preventDefault();
		removeChildren(LIST_LAPS);
		SETTINGS.laps = [];
		updateLaps();
	});

	const SETTINGS = {
		start: 0,
		progress: 0,
		currentTime: "",
		playing: false,
		timerId: null,
		laps: [],
		get milliseconds() {
			return Math.trunc(this.progress);
		}
	};

	updateLaps();

	function startTimer(timestamp) {
		if (!SETTINGS.start) SETTINGS.start = timestamp;
		SETTINGS.progress = timestamp - SETTINGS.start;
		SETTINGS.timerId = window.requestAnimationFrame(startTimer);
		TIME_DISPLAY.textContent = getDisplay();
	}

	function pauseTimer() {
		SETTINGS.playing = false;
		window.cancelAnimationFrame(SETTINGS.timerId);
	}

	function resetTimer() {
    // Increment SETTINGS.start with new delay time
    SETTINGS.start += SETTINGS.progress;
    SETTINGS.progress = 0.01;
    TIME_DISPLAY.textContent = "00:00:00:00";
}

function recordLap() {
	if (SETTINGS.playing === true) {
		SETTINGS.laps.push(SETTINGS.currentTime);
		updateLaps();
	}
}

function updateLaps() {
	removeChildren(LIST_LAPS);
	let fragment = document.createDocumentFragment();
	SETTINGS.laps.forEach(e => {
		createEl({ tag: "li", content: e, parent: fragment, addToParent: 1 });
	});
	LIST_LAPS.appendChild(fragment);
	BTN_CLEAR.style.display = SETTINGS.laps.length > 0 ? "block" : "none";
}

function getDisplay() {
	ms = Math.trunc((SETTINGS.milliseconds / 10) % 100);
	s = Math.trunc(SETTINGS.milliseconds / 1000)
	.toString()
	.padStart(2, "0");
	h = parseInt(s / 3600);
    s = s % 3600; // Purge extracted
    m = Math.trunc(s / 60)
    .toString()
    .padStart(2, "0");
    s = s % 60; // Purge extracted

    SETTINGS.currentTime = `${formatTime(h)}:${formatTime(m)}:${formatTime(
    	s
    	)}:${formatTime(ms)}`;
    return SETTINGS.currentTime;
}

function formatTime(time) {
	return time.toString().padStart(2, "0");
}

function createEl({ parent, tag, content, classes, addToParent } = {}) {
	let el = document.createElement(tag);
	if (content) {
		let txt = document.createTextNode(content);
		el.appendChild(txt);
	}
	if (classes) {
		el.setAttribute("class", classes);
	}
	if (addToParent) {
		parent.appendChild(el);
	}
	return el;
}

function removeChildren(el) {
	while (el.firstChild) {
		el.removeChild(el.firstChild);
	}
}
})();

var add = document.getElementById('add');
var remove = document.getElementById('remove');
var list = document.getElementById('list');


remove.onclick = function() {
	list.innerHTML = '';
}

add.onclick = function(){
	addlist(list);
	document.getElementById('user-input').value = '';
	document.getElementById('user-input').focus();
}

function addlist(targetUl){
	var inputText = document.getElementById('user-input').value;
	var li = document.createElement('li');
	var textNode = document.createTextNode(inputText + '');
	var removeButton = document.createElement('button');

	if (inputText !== '') {
		removeButton.className = 'btn btn-xs btn-danger';
		removeButton.innerHTML = '&times';
		removeButton.setAttribute('onclick', 'removeMe(this)');

		li.appendChild(textNode);
		li.appendChild(removeButton);
		targetUl.appendChild(li);
	}
	else{
		alert("Please enter a TODO");
	}
}

function removeMe(item){
	var p = item.parentElement;
	p.parentElement.removeChild(p);

}
