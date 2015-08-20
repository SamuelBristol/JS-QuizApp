$(document).ready(function () {

	var score = 0;
	var questions = [];
	var userAnswers = [];
	var currentQuestion = 0;

	var $question = $('#question');
	var $questionNumber = $('#questionNumber');
	var $questionWrapper = $('#questionWrapper');

	function init () {
		questions = [
			{ question: 'Who is this character?', 
				answers: ['Ken','Akuma','Oni','Ryu'], 
				correctAnswer: 3,
				imgURL: 'http://www.smashbros.com/images/character/ryu/main.png'},
			{	question: 'What game does Captain Falcon hail from?', 
				answers: ['Ridge Racer','F-Zero','Wipeout'], 
				correctAnswer: 1,
				imgURL: 'http://www.smashbros.com/images/character/captain_falcon/main.png'},
			{ question: 'Select the correct character that also appears in the Super Mario series', 
				answers: ['Donatello','King Koopa','K.K. Slider'], 
				correctAnswer: 1,
				imgURL: 'http://www.smashbros.com/images/character/luigi/main.png'}
		];

		$questionWrapper.hide();
	};
		
	init();
		
	function nextQuestion() {
		if (currentQuestion < questions.length - 1) {
			recordAnswer();
			currentQuestion++;
			updateUI();
		} else { 
			// show results
			$questionWrapper.fadeOut(250, function() {
				// save the final answer and clear inputs
				recordAnswer();
				clearInputs();

				// fade in the results div and show calculated results
				$('#results').fadeIn(250, function(){
					showResults();
				});
			});
		}
	};
		
	function showResults() {
		// calculate the score
		for(var i = 0; i < questions.length; i++) {
			if(questions[i].correctAnswer === userAnswers[i]){
				score++;
			}
		}

		// get percentage right
		var percentageCorrect = (score / questions.length) * 100;
		
		// fill in information
		$('#score').text(percentageCorrect.toFixed(2) + '%');
		$('#scoreOutput').text('You got ' + score + ' out of ' + questions.length + ' right!');
		$('#smashlogo').attr('src', "http://www.ssbwiki.com/images/f/fc/SmashBrosSymbol.png");
		
		$('#advice').text(getAdvice(percentageCorrect));
		
	};
	
	function getAdvice(percentageCorrect){
		if(percentageCorrect <= 25){
			return "Advice: You might want to bone up on your video game knowledge."
		} else if(percentageCorrect <= 50) {
			return "Advice: You seem to have been born in the past few decades. You'll figure it out."
		} else if(percentageCorrect <= 75) {
			return "Advice: You know a fair bit about video games, but there's always more to know."
		} else if(percentageCorrect <= 99) {
			return "Advice: You know more than most! Keep those thumbs strong."
		} else {
			return "Advice: There is no advice. You got everything right! Congratulations!"
		}
	};
	
	function previousQuestion() {
		if (currentQuestion > 0) {
			recordAnswer();
			currentQuestion--;
			updateUI();
		} else {
			// back to beginning
			$questionWrapper.fadeOut(250, function() {
				clearInputs();
				score = 0;
				$('#intro').fadeIn(250);
			});
		}
	};
		
	function clearInputs() {
		$questionNumber.text('');
		$question.text('');
		$('#answers').empty();
	};
		
	function loadQuestion() {
		// get the current question values
		var questionObj = questions[currentQuestion];
		$questionNumber.text("Question " + (currentQuestion + 1));
		$question.text(questionObj.question);
		$('#characterImg').attr('src', questions[currentQuestion].imgURL);
		
		// append the answers to div#answers with 0-based id
		var i = 0;
		questionObj.answers.forEach(function(answer) {
			$('#answers').append('<label><input type="radio" name="question' + currentQuestion + '_answers" id="answer_' + i + '"> ' + answer + '</label>');
			i++;
		});

		// fade in the question wrapper div
		$questionWrapper.fadeIn(250);
	};
		
	function updateUI() {
		$questionWrapper.fadeOut(250, function() {
			clearInputs();
			loadQuestion();
		});
	};

	function recordAnswer() {
		// get the index for the correct answer
		var answerIndex = questions[currentQuestion].correctAnswer;
		var $currentQuestionInputs = $('input[name="question' + currentQuestion + '_answers"');

		// get the index of the selected radio button's label(0-indexed position in list of answers)
		var radioIndex = $currentQuestionInputs.filter(':checked').parent().index();
		userAnswers[currentQuestion] = radioIndex;
		console.log(userAnswers);
	};
		
	$('input').click(function() {
		$(this).prop('checked', true);
	});
		
	$('#begin').click(function () {
		// fade out the intro section and load a question
		$('#intro').fadeOut(function(){
			loadQuestion();
		});
	});
		
	$('#next').click(function () {
		nextQuestion();
	});
		
	$('#previous').click(function () {
		previousQuestion();
	});
});