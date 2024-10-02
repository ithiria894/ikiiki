let flippedCards = [];
let matchedPairs = 0;
let num_Pairs = 7; // Default number of pairs
let startTime; // Variable to hold the start time
let timerInterval; // Variable to hold the timer interval
let elapsedTime = 0; // Variable to hold elapsed time in seconds
let timerStarted = false; // New variable to track if the timer has started

const contentPool = [
    '🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍑', '🍍', 
    '🍐', '🍊', '🍋', '🍈', '🍏', '🥝', '🍅', '🥥',
    '🍆', '🥑', '🌽', '🥕', '🥒', '🥔', '🍠', '🍞',
    '🥐', '🥖', '🥨', '🧀', '🥩', '🍗', '🍖', '🍤',
    '🍣', '🍜', '🍲', '🍕', '🍔', '🍟', '🌭', '🥪',
    '🌮', '🌯', '🍿', '🥟', '🍤', '🍱', '🍛', '🥘',
    '🍝', '🍚', '🍨', '🍧', '🍩', '🍪', '🎂', '🍰',
    '🥧', '🍫', '🍬', '🍭', '🍮', '🍯', '🥤', '☕',
    '🍵', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸',
    '🍹', '🍾', '🥄', '🍴', '🥢', '🍽', '🍼', '🍳'
];

// Function to generate a random cardsArray
function generateRandomCardsArray() {
    let selectedContent = [];
    while (selectedContent.length < num_Pairs) {
        const randomContent = contentPool[Math.floor(Math.random() * contentPool.length)];
        if (!selectedContent.includes(randomContent)) {
            selectedContent.push(randomContent);
        }
    }
    const cardsArray = [...selectedContent, ...selectedContent].map((content, index) => ({
        id: index + 1,
        content
    }));
    return shuffle(cardsArray);
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    const cardsArray = generateRandomCardsArray();

    cardsArray.forEach((card, index) => {
        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add('card-wrapper');

        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.dataset.index = index;

        cardElement.innerHTML = `<div class="card-content"></div>`;

        cardElement.addEventListener('click', flipCard.bind(null, cardElement, cardsArray));

        const cardNumberElement = document.createElement('span');
        cardNumberElement.classList.add('card-number');
        cardNumberElement.innerText = `${index + 1}`;

        cardWrapper.appendChild(cardElement);
        cardWrapper.appendChild(cardNumberElement);

        gameBoard.appendChild(cardWrapper);
    });
}

function flipCard(cardElement, cardsArray) {
    const cardIndex = cardElement.dataset.index;

    if (flippedCards.length < 2 && !cardElement.classList.contains('flipped')) {
        cardElement.classList.add('flipped');
        const cardContentElement = cardElement.querySelector('.card-content');
        cardContentElement.innerHTML = cardsArray[cardIndex].content;
        flippedCards.push(cardElement);

        // Start timer if this is the first card being flipped and the timer hasn't started yet
        if (flippedCards.length === 1 && !timerStarted) {
            startTimer();
        }

        if (flippedCards.length === 2) {
            checkForMatch(cardsArray);
        }
    }
}

function startTimer() {
    startTime = Date.now(); // Set the start time
    timerStarted = true; // Mark that the timer has started
    console.log("started timer at ", startTime);
    timerInterval = setInterval(() => {
        elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time in seconds
    }, 1000);
}

function checkForMatch(cardsArray) {
    const [card1, card2] = flippedCards;

    const card1Content = cardsArray[card1.dataset.index].content;
    const card2Content = cardsArray[card2.dataset.index].content;

    if (card1Content === card2Content) {
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === cardsArray.length / 2) {
            clearInterval(timerInterval); // Stop the timer
            setTimeout(() => {
                const minutes = Math.floor(elapsedTime / 60);
                const seconds = elapsedTime % 60;

                alert(`おめでとうございます！！！！ゲーム終わりました～～～～\n所要時間: ${minutes} 分 ${seconds} 秒`);

            }, 300);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.querySelector('.card-content').innerHTML = '';
            card2.querySelector('.card-content').innerHTML = '';
            flippedCards = [];
        }, 1000);
    }
}

createBoard();

// Modal control for settings
const settingsModal = document.getElementById('settings-modal');
const settingsButton = document.getElementById('settings-button');
const closeSettingsButton = document.getElementById('close-settings');
const saveSettingsButton = document.getElementById('save-settings');
const numPairsInput = document.getElementById('numPairsInput');

// Open settings modal
settingsButton.onclick = function() {
    settingsModal.style.display = 'block';
}

// Close settings modal
closeSettingsButton.onclick = function() {
    settingsModal.style.display = 'none';
}

// Save settings and regenerate the board
saveSettingsButton.onclick = function() {
    num_Pairs = parseInt(numPairsInput.value);
    matchedPairs = 0;  // Reset matched pairs
    flippedCards = []; // Reset flipped cards
    elapsedTime = 0;   // Reset elapsed time
    timerStarted = false; // Reset timer started flag
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear existing board
    createBoard(); // Create a new board
    settingsModal.style.display = 'none'; // Close the modal
}

// Modal control for rules
const modal = document.getElementById('rules-modal');
const btn = document.getElementById('rules-button');
const closeRulesButton = document.getElementById('close-rules');

// Open rules modal
btn.onclick = function() {
    modal.style.display = 'block';
}

// Close rules modal
closeRulesButton.onclick = function() {
    modal.style.display = 'none';
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target === settingsModal) {
        settingsModal.style.display = 'none';
    }
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
