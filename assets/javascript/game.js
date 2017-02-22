var words = ["plant", "bicycle", "building", "lunch", "water", "bread", "swimming", "sunsetsun", "liberal", "exercise"];
var win = 0 , loss = 0, index = 0, number_of_guess = 10;
var correct = [], incorrect = [];
var target_alphabet;
var audio = new Audio ("assets/audio/CHAMPION.mp3");

document.onkeyup = function runGame(event){
	if (number_of_guess === 0){
		loss++;
		document.querySelector("#loss").innerHTML = loss;
		number_of_guess = 10;
		index = index + 1;
		correct = [];
		incorrect=[];
		document.querySelector("#current_word").innerHTML ="- - - - - -";
		document.querySelector("#letters").innerHTML ="- - - - - -";
		document.querySelector("#number").innerHTML = 10;
		return loss;
	}
	else if (number_of_guess ===-1){
		number_of_guess = 10;
		index = index + 1;
		correct = [];
		incorrect=[];
		document.querySelector("#current_word").innerHTML ="- - - - - -";
		document.querySelector("#letters").innerHTML ="- - - - - -";
		document.querySelector("#number").innerHTML = 10;	
	}

	else{
		target_word = words[index];
		Game.split_word(target_word);
		Game.check_alphabet(event);
		Game.compare_word(correct);
	}
};

var Game = {

	//  split_word convert the word to lower case
	//  split lower case word to string array "target_alphabet"
	split_word : function(word){
		word = word.toLowerCase();
		target_alphabet = word.toString();
		return target_alphabet;
	},

	// prupose: check whether the input key word is correct:
	// call split_word function to call back target_alphabet
	// check key value. If key value in target_alphabet, rewrite it into array correct.
	// Otherwise, add the key value into array incorrect 
	check_alphabet : function(event){
		if (target_alphabet.indexOf(event.key.toLowerCase())!== -1 && correct.indexOf(event.key) === -1){
			for (i = 0; i < target_alphabet.length; i++){
				if (target_alphabet [i] === event.key.toLowerCase()){
					correct[i] = event.key.toLowerCase();
				}
			};
		}
		else if (target_alphabet.indexOf(event.key.toLowerCase())=== -1 && incorrect.indexOf(event.key) === -1){
			incorrect.push(event.key.toUpperCase());
			number_of_guess--;
			console.log(number_of_guess);
		};

		for (i = 0; i < target_alphabet.length; i++){
			if (!correct [i]){
				correct[i] = "-";
			}
		};

		document.querySelector("#current_word").innerHTML = correct.join(" ");
		document.querySelector("#letters").innerHTML = incorrect.join(" ");
		document.querySelector("#number").innerHTML = number_of_guess;
		return correct,incorrect;
	},

	compare_word: function(correct){
		if (correct.join("") === target_word){
			win ++;
			document.querySelector("#win").innerHTML = win;
			document.querySelector("img").src = "assets/images/" + target_word + ".jpg";
			audio.load();	
			audio.play();
			number_of_guess = -1;
			return win;
		}	
	}
}



