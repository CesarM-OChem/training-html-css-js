let word = ''
let score = 0
let guess = 8

async function getWords(){
    // Cleans previous letters
    document.getElementById('usedLetters').textContent = ""
    document.getElementById('messageContainer').textContent = ""
    for(var i = 0, l = word.length; i < l; i++){
        document.getElementById('sp' + i).textContent = '*'
    }

    let url = "https://raw.githubusercontent.com/CesarM-OChem/training-html-css-js/main/guess-the-word/word-list.txt"
    try{
        var response = await fetch(url)
        if (response.ok){
            var text = await response.text()
            let words = text.split('\n')
            let randomIndex = Math.floor(Math.random() * words.length)
            word = words[randomIndex].toLowerCase()

            var generated = document.getElementById('generated')
            generated.textContent = "Word generated! Make a guess..."
            generated.style.display = 'block'

            setTimeout(function(){
                generated.style.display = 'none'
            }, 3000)

            document.getElementById('remainingGuesses').textContent = "You have 8 remaining guesses!"
            guess = 8
            document.getElementById('entry').disabled = false
            clearEntry()

            console.log(word)
        }else{
            alert("Error getting list of words")
        }
    }catch(error){
        alert("Error getting list of words")
    }
}

function verifyLetter(){
    if(word === ""){
        alert("You need to generate a word first!!")
        return
    }

    let letter = document.getElementById("entry").value.toLowerCase()
    if(letter.length !== 1){
        alert("Please, type one letter...")
        clearEntry()
        return
    }

    if(!/^[a-z]$/.test(letter)){
        alert("Please, type only letters between A and Z")
        clearEntry()
        return
    }

    // Clear input text-box
    clearEntry()

    if(document.getElementById("usedLetters").textContent.includes(letter)){
        showMessage("You already used this letter...")
        return
    }

    document.getElementById("usedLetters").textContent += letter + " "

    let match = false
    for(var i = 0, l = word.length; i < l; i++){
        if(word[i] === letter){
            document.getElementById("sp" + i).textContent = letter
            match = true
        }
    }
    
    if(match){
        showMessage("Nice! You guessed a letter!")
        alterGuessNumber(1)
        
    }else{
        showMessage("Oh no! You missed your guess...")
        alterGuessNumber(-1)
    }
}

function showMessage(message){
    var messageContainer = document.getElementById("messageContainer")
    messageContainer.textContent = message
    messageContainer.style.display = 'block'
}

function clearEntry(){
    var input = document.getElementById("entry")
    input.value = ''
    input.focus()
}

function alterGuessNumber(addValue){
    guess += addValue
    let guessBox = document.getElementById('remainingGuesses')

    if(guess == 1){
        guessBox.textContent = "This is your last chance!"
        return
    }

    if(guess == 0){
        for(let i = 0, l = word.length; i < l; i++){
            if(document.getElementById('sp' + i).textContent === '*'){
                guessBox.textContent = "Oh no! It seems that you lost this match.. Try another time..."
                document.getElementById('entry').disabled = true
                return
            }
        }
    }
    
    for(let i = 0, l = word.length; i < l; i++){
        if(document.getElementById('sp' + i).textContent === '*'){
            guessBox.textContent = "You have " + guess + " remaining guesses!"
            return
        }
    }

    guessBox.textContent = "Congratulations!! You have found the correct word!!"
    document.getElementById('entry').disabled = true
    updateScore()
}

function updateScore(){
    score++
    var scoreText = String(score).padStart(3, '0')
    document.getElementById('score').textContent = `
        score
        ${scoreText}
    `
}