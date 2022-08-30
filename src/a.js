const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const words = ['cat', 'dog', 'banana'];

function input_validation(input, letters) {
    if (letters.includes(input))  {
        return true;
    }
    return false;
}

function select_word(words) {
    var index = Math.floor(Math.random() * words.length);
    return words[index];
}

function asterisk(word) {
    let asterisk_word = '';
    for (var i = 0; i < word.length; i++) {
        asterisk_word = asterisk_word + '*';
    }
    return asterisk_word;
}

function game() {
    let word = select_word(words);
    let user_guesses = [];
    let hidden_word = asterisk(word);

    let guesses = 1;
    while (guesses > 0) {
        console.log("You have " + String(guesses) + " guesses")
        console.log("The word is " + String(hidden_word))
        let guess = prompt("What is your guess?");

        if (!input_validation(guess, letters)) {
            console.log('Invalid input!');
        } else if (user_guesses.includes(guess)) {
            console.log('You already guessed this letter');
        } else if (word.includes(guess)) {
            user_guesses.push(guess);
            for (var i = 0; i < word.length; i++) {
                if (word[i] === guess) {
                		let hidden_word = word.substring(0,i) + guess + word.substring(i+1);
                }
            }
        } else {
            user_guesses.push(guess);
            guesses = guesses - 1;
        }
        if (!hidden_word.includes('*')) {
            console.log('Wow you are good!');
            break;
        }
    }
}

game.call();