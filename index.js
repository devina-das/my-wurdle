let keyword = "";
let curr_guess = 1;
let start_button = document.getElementById("start");
let reset_button = document.getElementById("reset");

reset_button.hidden = true;

async function getWord() {
    const fileUrl = 'sgb-words.txt';
    let file_data = await (await fetch(fileUrl)).text();
    let words = file_data.split("\n");
    let word = words[Math.floor(Math.random() * words.length)];
    return word;
}

function addLetter(key) {
    let letters = document.getElementById(`guess${curr_guess}`).children;
    let ind = 0;

    while (ind < letters.length && letters[ind].textContent !== '') {
        ind++;
    }

    if (ind < letters.length) {
        letters[ind].textContent = key.toUpperCase();
    }
}

function deleteLetter() {
    let letters = document.getElementById(`guess${curr_guess}`).children;
    let ind = letters.length - 1;

    while (ind >= 0 && letters[ind].textContent == '') {
        ind--;
    }

    if (ind >= 0) {
        letters[ind].textContent = '';
    }
}

function checkInput(input) {
    let output = [];
    let temp_key = keyword.split("");

    for (let i = 0; i < input.length; i++) {
        if (input[i] === temp_key[i]) {
            output.push("yesyes");
            temp_key[i] = "*";
        } else {
            output.push("nono");
        }
    }

    for (let i = 0; i < input.length; i++) {
        if (output[i] === "nono") {
            let ind = temp_key.indexOf(input[i]);
            if (ind !== -1) {
                output[i] = "yesno";
                temp_key[ind] = "*";
            }
        }
    }

    return output;
}


function submitGuess() {
    let letters = document.getElementById(`guess${curr_guess}`).children;
    let input = "";

    for (let ind = 0; ind < letters.length; ind++) {
        if (letters[ind].textContent == '') {
            alert('incomplete guess');
            return;
        } else {
            input += letters[ind].textContent.toLowerCase();
        }
    }

    let output = checkInput(input);

    for (let ind = 0; ind < letters.length; ind++) {
        letters[ind].classList.toggle(output[ind], true);
    }
    curr_guess++;
}

function updateBoard(key) {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (key == 'Backspace') {
        deleteLetter(key);
    } else if (key == 'Enter') {
        submitGuess();
    } else if (chars.includes(key.toLowerCase())) {
        addLetter(key);
    }
}

function checkWin() {
    if (curr_guess - 1 < 1 || curr_guess > 5) {
        return false;
    }
    let letters = document.getElementById(`guess${curr_guess - 1}`).children;

    for (let ind = 0; ind < letters.length; ind++) {
        if (!letters[ind].classList.contains("yesyes")) {
            return false;
        }
    }
    document.getElementById
    return true;
}

document.addEventListener('keydown', function(event) {
    let key = event.key;

    if (keyword != '' && !checkWin() && curr_guess <= 5) {
        console.log('pressed key:', key);
        updateBoard(key);
    }

    if (checkWin()) {
        document.getElementById('title').classList.toggle('winner', true);
    }

    if (curr_guess > 5) {
        document.getElementById("output").textContent = `the word was ${keyword}`;
    }
});

start_button.addEventListener('click', async function() {
    keyword = await getWord();
    console.log(keyword);
    start_button.hidden = true;
    reset_button.hidden = false;
});

reset_button.addEventListener('click', async function() {
    window.location.reload();
});