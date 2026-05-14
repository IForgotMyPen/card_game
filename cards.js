// Some "global variables" that are useful throughout the project

let currentDeck;
let imageOffset = '0px';

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
    #cardCount;
    #cards;

    constructor(name, cards) {
        this.#name = name;
        this.#cards = cards;
        this.#cardCount = cards.length;

        // Prepending a new button to the body to switch the current_deck variable to this deck

        const deckPlaceholder = this;

        const newButton = document.createElement('button');
        newButton.textContent = `${this.#name}`;
        newButton.type = 'button';
        newButton.onclick = function() {
            currentDeck = deckPlaceholder;
            document.getElementById('current_deck').innerHTML = `Current deck: ${currentDeck.name}`;
        };
        document.body.prepend(newButton);

        // If this is the first deck created, make it current_deck

        if (currentDeck === undefined) {
            currentDeck = deckPlaceholder;
            document.getElementById('current_deck').innerHTML = `Current deck: ${currentDeck.name}`;
        }
    }

    get name() {return this.#name;}
    get cardCount() {return this.#cardCount;}
    get cards() {return this.#cards;}

    // Get a random card in the deck

    getRandomCard() {
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        return this.#cards[getRandomInt(this.#cardCount)];
    }

    // Draw a card from the deck

    draw() {

        // Simple catch to end the function if the deck is empty

        if (currentDeck.card_count === 0) {
            console.log('REMOVE: current deck is empty');
            return;
        }

        const randCard = this.getRandomCard();

        const newCard = document.createElement('img');
        newCard.src = `${randCard.image}`;
        newCard.title = `${capitalize(randCard.rank)} of ${capitalize(randCard.suit)}s`;
        newCard.style.position = 'absolute';
        newCard.style.top = 0;
        newCard.style.left = imageOffset;
        newCard.style.width = '200px'

        // This is my somewhat confusing way of adjusting the offset so each card lays on top of the last

        const newOffset = Number(imageOffset.split('px')[0]) + 30;
        imageOffset = `${newOffset}px`; 

        document.getElementById('cardImages').append(newCard);

        // Remove card from deck

        this.removeCard(randCard);
    }

    // Helper method to remove a card from the deck

    removeCard(card) {
        const index = this.#cards.indexOf(card);
        if (index > -1) {
            this.#cards.splice(index, 1);
        }
        this.#cardCount -= 1;
    }
}

// Creating placeholder decks for testing new things

const suits = ['spade', 'heart', 'diamond', 'club'];

const ranks = ['ace',2,3,4,5,6,7,8,9,10,'jack','queen','king'];

const deck1Cards = [];
for (const suit of suits) {
    for (const rank of ranks) {
        deck1Cards.push(new Card(suit, rank, `${suit}_${rank}.png`));
    }
}

const deck2Cards = [];
for (const rank of ranks) {
    deck2Cards.push(new Card('heart', rank, `heart_${rank}.png`));
}

const deck1 = new Deck('standard deck', deck1Cards);
const deck2 = new Deck('all-hearts deck', deck2Cards);

// Helper method for capitalizing

function capitalize(str) {
    return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}