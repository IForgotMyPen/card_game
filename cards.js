let current_deck;

// Card class for individual cards

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

// Deck class for full decks (not necessarily the standard 52-card deck)

class Deck {
    #name;
    #card_count;
    #cards;

    constructor(name, cards) {
        this.#name = name;
        this.#cards = cards;
        this.#card_count = cards.length;

        // Appending a new button to the body to switch the current_deck variable to this deck

        const deck_placeholder = this;

        const new_button = document.createElement('button');
        new_button.textContent = `${this.#name}`;
        new_button.type = 'button';
        new_button.onclick = function() {
            current_deck = deck_placeholder;
            document.getElementById('current_deck').innerHTML = `Current deck: ${current_deck.name}`;
        };
        document.body.prepend(new_button);
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

    // Draw a card from the deck
    // TODO: make it so when a card is drawn, it is removed from the deck

    draw() {
        const rand_card = this.getRandomCard();

        const html_card = document.getElementById('card_image');

        html_card.src = `${rand_card.image}`;
        html_card.title = `${capitalize(rand_card.rank)} of ${capitalize(rand_card.suit)}s`;
    }
}

// Creating placeholder decks for testing new things

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

// Helper method for capitalizing

function capitalize(str) {
    return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}