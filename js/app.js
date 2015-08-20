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
			{ question: 'How do I shot web?', 
				answers: ['Up','Down','Left','Right'], 
				correctAnswer: 0	},
			{	question: 'But who was villain?', 
				answers: ['Supamang','Goobey','Dolan','Mouse'], 
				correctAnswer: 2 },
			{ question: 'What is my name?', 
				answers: ['Doug','Chuy','Greg','Sam'], 
				correctAnswer: 3 }
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
		$('#results').append('<h1>Your score: ' + percentageCorrect.toPrecision(2) + '%</h1>');
		$('#results').append('<p class="lead">You got ' + score + ' out of ' + questions.length + ' right!');
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