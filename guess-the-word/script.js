let word = ''

async function getWords(){
    let url = "https://raw.githubusercontent.com/CesarM-OChem/training-html-css-js/main/guess-the-word/word-list.txt"
    try{
        var response = await fetch(url)
        if (response.ok){
            var text = await response.text()
            let words = text.split('\n')
            let randomIndex = Math.floor(Math.random() * words.length)
            word = words[randomIndex].toLowerCase()
            console.log(word)
        }else{
            alert("Error getting list of words")
        }
    }catch(error){
        alert("Error getting list of words")
    }
}

function verifyLetter(){
    let letter = document.getElementById("entry").value.toLowerCase()
    if(letter.length !== 1){
        alert("Please, type one letter...")
        return
    }

    if(!/^[a-z]$/.test(letter)){
        alert("Please, type only letters between A and Z")
        return
    }

    let match = false
    for(var i = 0, l = word.length; i < l; i++){
        if(word[i] === letter){
            let id = "sp"+i
            document.getElementById("sp" + i).textContent = letter
            match = true
        }
    }

    if(match){
        showMessage("Nice! You guessed a letter!")
    }else{
        showMessage("Oh no! You missed your guess...")
    }
}

function showMessage(message){
    var messageContainer = document.getElementById("messageContainer")
    messageContainer.textContent = message
    messageContainer.style.display = 'block'
}