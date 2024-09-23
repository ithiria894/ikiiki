const cardsArray = [
    { id: 1, content: '🍎' },
    { id: 2, content: '🍌' },
    { id: 3, content: '🍇' },
    { id: 4, content: '🍉' },
    { id: 5, content: '🍎' },
    { id: 6, content: '🍌' },
    { id: 7, content: '🍇' },
    { id: 8, content: '🍉' }
];

let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    shuffle(cardsArray).forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.dataset.index = index;
        cardElement.innerHTML = `<span class="card-number">${index + 1}</span>`;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    const card = this;
    const cardIndex = card.dataset.index;

    // Prevent flipping more than 2 cards or flipping already matched cards
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        card.innerHTML = cardsArray[cardIndex].content + `<span class="card-number">${parseInt(cardIndex) + 1}</span>`;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    // Get the names of the flipped cards using their index
    const card1Name = cardsArray[card1.dataset.index].content;
    const card2Name = cardsArray[card2.dataset.index].content;

    console.log("length:" + flippedCards.length);
    console.log("card1name:" + card1Name);
    console.log("card2name:" + card2Name);

    if (card1Name === card2Name) {
        // Cards matched, keep them flipped
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === cardsArray.length / 2) {
            setTimeout(() => {
                alert('Congratulations! You matched all the cards!');
            }, 300);
        }
    } else {
        // No match, flip them back
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = `<span class="card-number">${parseInt(card1.dataset.index) + 1}</span>`;
            card2.innerHTML = `<span class="card-number">${parseInt(card2.dataset.index) + 1}</span>`;
            flippedCards = [];
        }, 1000);
    }
}

createBoard();
