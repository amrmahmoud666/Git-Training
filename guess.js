// Setting Game Name
let gameName = "Guess The Word"
document.title = gameName
document.querySelector("h1").innerHTML = gameName
document.querySelector("footer").innerHTML = `${gameName} Created By Amr`

// Setting Inputs

let NumbersOfTries = 6
let CurrentTry = 1
let numberOfHints = 2

let WordToGuess = ""
const words = [
    "apple", 
    "banana", 
    "cherry", 
    "date", 
    "elderberry", 
    "fig", 
    "grape", 
    "honeydew", 
    "kiwi", 
    "lemon", 
    "mango", 
    "nectarine", 
    "orange", 
    "papaya", 
    "quince", 
    "raspberry", 
    "strawberry", 
    "tangerine", 
    "ugli", 
    "vanilla", 
    "watermelon", 
    "xigua", 
    "yam", 
    "zucchini",
    "blueberry", 
    "blackberry", 
    "cantaloupe", 
    "dragonfruit", 
    "eggplant", 
    "grapefruit", 
    "huckleberry", 
    "jackfruit", 
    "kumquat", 
    "lime", 
    "mulberry", 
    "olive", 
    "pear", 
    "plum", 
    "pomegranate", 
    "persimmon", 
    "apricot", 
    "pineapple", 
    "coconut", 
    "guava", 
    "lychee", 
    "peach", 
    "passionfruit", 
    "sapodilla", 
    "tomato", 
    "kiwifruit", 
    "soursop", 
    "starfruit", 
    "avocado", 
    "currant", 
    "gooseberry", 
    "jambul", 
    "loganberry", 
    "medlar", 
    "prune", 
    "bilberry", 
    "cranberry", 
    "dewberry", 
    "feijoa", 
    "loquat", 
    "mirabelle", 
    "tamarind", 
    "physalis"
];

WordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase()
let NumberOfLetters = WordToGuess.length

// Setting Hints
document.querySelector(".hint span").innerHTML = numberOfHints
let hintButton = document.querySelector(".hint")
hintButton.addEventListener("click", gethint)

let message = document.querySelector(".message")
console.log(WordToGuess)

function generateinputs() {
    const inputsContainer = document.querySelector(".inputs")

    for (let i = 1; i <= NumbersOfTries; i++) {
        const trydiv = document.createElement("div")
        trydiv.classList.add(`try-${i}`)
        trydiv.innerHTML = `<span>Try ${i}</span>`
        inputsContainer.appendChild(trydiv)

        if (i != 1) trydiv.classList.add("disabled-inputs")
        
        for (let j = 1; j <= NumberOfLetters; j++) {
        const input = document.createElement("input")
        input.id = `guess-${i}-letter-${j}`
            input.type = "text"
            input.setAttribute("maxlength" , "1")
        trydiv.appendChild(input)
        }
    }

    inputsContainer.children[0].children[1].focus()

    // Disable All Inputs Except The First One
    const InputsinDisabledDiv = document.querySelectorAll(".disabled-inputs input")
    InputsinDisabledDiv.forEach((input) => (input.disabled = true))

    const inputs = document.querySelectorAll("input")

    inputs.forEach((input, index) => {
        input.addEventListener("input", function () {
            this.value = this.value.toUpperCase()

            const nextinput = inputs[index + 1]

            if ( this.value != "") nextinput.focus()
        })
        input.addEventListener("keydown", function (event) {
            const currentIndex = Array.from(inputs).indexOf(event.target)
            // console.log(currentIndex)
            if (event.key === "ArrowRight") {
                const nextIndex = currentIndex + 1
                if (nextIndex < inputs.length) inputs[nextIndex].focus()
            }
            if (event.key === "ArrowLeft") {
                const preIndex = currentIndex - 1
                if (preIndex >= 0) inputs[preIndex].focus()
            }
        })
    })
    }

const guessbutton = document.querySelector(".check")
guessbutton.addEventListener("click", handleGusses)
// console.log(guessbutton)
function handleGusses() {
    let succesGuess = true
    for (let i = 1; i <= NumberOfLetters; i++) {
        const inputfield = document.querySelector(`#guess-${CurrentTry}-letter-${i}`)
        const letter = inputfield.value.toLowerCase()
        const actualletter = WordToGuess[i - 1]

        // Game Logic
        if (actualletter === letter) {
            inputfield.classList.add("yes-in-place")
        } else if (WordToGuess.includes(letter) && letter != "") {
            inputfield.classList.add("not-in-place")
            succesGuess = false
        } else {
            inputfield.classList.add("no")
            succesGuess = false
        }
    }
    if (succesGuess) {
        message.innerHTML = `You Win And The Word Is <span>${WordToGuess}</span>`

        let allInputs = document.querySelectorAll(".inputs > div")
        allInputs.forEach((trydiv) => trydiv.classList.add("disabled-inputs"))

        guessbutton.disabled = true
        hintButton.disabled = true
    } else {
        document.querySelector(`.try-${CurrentTry}`).classList.add("disabled-inputs")
        // console.log(document.querySelector(`try-${CurrentTry}`))
        let currentTryinputs = document.querySelectorAll(`.try-${CurrentTry} input`)
        currentTryinputs.forEach((input) => (input.disabled = true))
        
        CurrentTry++

        let nextTryinputs = document.querySelectorAll(`.try-${CurrentTry} input`)
        nextTryinputs.forEach((input) => (input.disabled = false))

        let el = document.querySelector(`.try-${CurrentTry}`)
        if (el) {
        document.querySelector(`.try-${CurrentTry}`).classList.remove("disabled-inputs")
        el.children[1].focus()
        } else {
            message.innerHTML = `You Lose And The Word Is <span>${WordToGuess}</span>`
            guessbutton.disabled = true
            hintButton.disabled = true
        }
    }
}

function gethint() {
    if (numberOfHints > 0) {
        numberOfHints--;
        document.querySelector(".hint span").innerHTML = numberOfHints
    }
    if (numberOfHints === 0) {
        hintButton.disabled = true
    }

    const enabledInputs = document.querySelectorAll("input:not([disabled])")
    // console.log(enabledInputs)
    const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "")
    // console.log(emptyEnabledInputs)

    
    if (emptyEnabledInputs.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length)
        const randomInput = emptyEnabledInputs[randomIndex]
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput)
        console.log(randomIndex)
        console.log(indexToFill)
        if (indexToFill !== -1) {
            randomInput.value = WordToGuess[indexToFill].toUpperCase()
        }
    }
}

function handleBackSpace(event) {
    if (event.key === "Backspace") {
        const Inputs = document.querySelectorAll("input:not([disabled])")
        const currentIndex = Array.from(Inputs).indexOf(document.activeElement)
        const activeinput = Inputs[currentIndex]
        const preinput = Inputs[currentIndex - 1]
        if (currentIndex > 0) {
            activeinput.value = ""
            preinput.focus()
        }
    }
}

document.addEventListener("keydown",handleBackSpace)

window.onload = function () {
    generateinputs()
}