'use strict'

let validWordList = palabras_validas;

let wordList = [
    'aves',
    'bosque',
    'gases',
    'huella',
    'lluvia',
    'marea',
    'oceano',
    'calor',
    'riesgo',
    'selva',
    'sequia',    
    'solar',
    'suelo',
    'tala',
    'tierra',
    'toxico',
    'veneno',
];

let randomIndex = Math.floor(Math.random() * wordList.length)
let secret = wordList[randomIndex]

let currentAttempt = ''
let history = []

let grid = document.getElementById('grid')
buildGrid()
updateGrid()
window.addEventListener('keydown', handleKeyDown)

function handleKeyDown(e) {
    let letter = e.key.toLowerCase()
    if (letter === 'enter') {
        if (currentAttempt.length < secret.length) {
            return
        }
        if (!validWordList.includes(currentAttempt)) {
            alert('Palabra no valida')
            return
        }
        history.push(currentAttempt)
        currentAttempt = ''
    } else if (letter === 'backspace') {
        currentAttempt = currentAttempt.slice(0, currentAttempt.length - 1)
    } else if (/[a-zñ]/.test(letter)) {
        if (currentAttempt.length < secret.length) {
            currentAttempt += letter
        }
    }
    updateGrid()
}

function buildGrid() {
    for (let i = 0; i < secret.length; i++) {
        let row = document.createElement('div')
        for (let j = 0; j < (secret.length); j++) {
            let cell = document.createElement('div')
            cell.className = 'cell'
            cell.textContent = ''
            row.appendChild(cell)
        }
        grid.appendChild(row)
    }
}


function updateGrid() {
    let row = grid.firstChild
    for (let attempt of history) {
        drawAttempt(row, attempt, false)
        row = row.nextSibling
    }
    drawAttempt(row, currentAttempt, true)
}

function drawAttempt(row, attempt, isCurrent) {
    for (let i = 0; i < secret.length; i++) {
        let cell = row.children[i]
        if (attempt[i] !== undefined) {
            cell.textContent = attempt[i]
        } else {
            cell.innerHTML = '<div style="opacity: 0">X</div>'
        }
        if (isCurrent) {
            cell.style.backgroundColor = '#d5e1d0'
        } else {
            cell.style.backgroundColor = getBgColor(attempt, i)
        }
    }
}

function getBgColor(attempt, i) {
    let correctLetter = secret[i]
    let attemptLetter = attempt[i]
    if (
        attemptLetter === undefined ||
        secret.indexOf(attemptLetter) === -1
    ) {
        return '#5c5c5c'
    }
    if (correctLetter === attemptLetter) {
        return '#538d4e'
    }
    return '#b59f3b'
}

function press(letter){
    window.dispatchEvent(new KeyboardEvent('keydown', {'key': letter}));
}


