// Setting up card class and suits/ranks to fill the deck

class Card {
    #suit;
    #rank;
    #image

    constructor(suit, rank, image) {
        this.#suit = suit;
        this.#rank = rank;
        this.#image = `cards/${suit}_${rank}.png`;
    }

    get suit() {return this.#suit;}
    get rank() {return this.#rank;}
    get image() {return this.#image}
}

const suits = ['spade', 'heart', 'diamond', 'club'];

const ranks = ['ace',2,3,4,5,6,7,8,9,10,'jack','queen','king'];

const cards = [];

// Load the deck

for (const suit of suits) {
    for(const rank of ranks) {
        const card = new Card(suit, rank);
        cards.push(card);
    }
}

// Pick random card

function getRandomCard() {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    return cards[getRandomInt(52)];
}

// Draw a card

function draw() {
    rand_card = getRandomCard();

    const html_card = document.getElementById('card_image');

    html_card.src = `${rand_card.image}`;
    html_card.title = `${capitalize(rand_card.rank)} of ${capitalize(rand_card.suit)}s`;
}



// Helper method for capitalizing

function capitalize(str) {
    return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}