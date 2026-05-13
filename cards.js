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

class Deck {
    #name;
    #card_count;
    #cards;

    constructor(name, cards) {
        this.#name = name;
        this.#cards = cards;
        this.#card_count = cards.length;
    }

    get name() {return this.#name;}
    get card_count() {return this.#card_count;}
    get cards() {return this.#cards;}

    // Get a random card in the deck

    getRandomCard() {
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        return this.#cards[getRandomInt(this.#card_count)];
    }

    draw() {
        const rand_card = this.getRandomCard();

        const html_card = document.getElementById('card_image');

        html_card.src = `${rand_card.image}`;
        html_card.title = `${capitalize(rand_card.rank)} of ${capitalize(rand_card.suit)}s`;
    }
}

const suits = ['spade', 'heart', 'diamond', 'club'];

const ranks = ['ace',2,3,4,5,6,7,8,9,10,'jack','queen','king'];

const deck1_cards = [];
for (const suit of suits) {
    for (const rank of ranks) {
        deck1_cards.push(new Card(suit, rank, `${suit}_${rank}.png`));
    }
}

const deck2_cards = [];
for (const rank of ranks) {
    deck2_cards.push(new Card('heart', rank, `heart_${rank}.png`));
}

const deck1 = new Deck('standard deck', deck1_cards);
const deck2 = new Deck('all-hearts deck', deck2_cards);

const current_deck = deck2;

// Helper method for capitalizing

function capitalize(str) {
    return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}