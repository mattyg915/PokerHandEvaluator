/**
 * Runs test on manually-inputted string representing a hand of cards from the html page
 */
function manualTests() {
    let handInput = document.getElementById("cardInput").value;
    let handResult = document.getElementById("hand");
    let rankScore = document.getElementById("result");

    let hand = createHandFromString(handInput);

    if (!hand) {
        handResult.innerText = "Invalid input";
        return;
    }

    handResult.innerText = hand.toString();

    let rank = hand.evaluate();

    rankScore.innerText = rank[0];
}

/**
 * Creates and shuffles a deck, deals a hand, and evaluates it. Result printed to html page
 */
function randomTests() {
    let deck = new Deck();
    let handResult = document.getElementById("hand");
    let rankScore = document.getElementById("result");

    deck.shuffle();
    let hand = deck.deal(5);

    handResult.innerText = hand.toString();

    let rank = hand.evaluate();

    rankScore.innerText = rank[0];
}

/**
 * Can be used to test without the html page
 * @param handInput String representing a hand
 */
function consoleOnlyTests(handInput) {
    let hand = createHandFromString(handInput);

    if (!hand) {
        console.log("Invalid input");
        return;
    }

    console.log("Cards in your hand: " + hand.toString() + "\n");

    let rank = hand.evaluate();

    console.log("Result: " + rank[0]);
}



/**
 * Takes a string representing a hand of 5 cards in the
 *  format {face}{one letter suit} separated by spaces
 *  eg AS 5D 7H 3C 10S
 * @return a hand with 5 cards, or false if string not
 *  correctly formatted/wrong number of cards given
 */
function createHandFromString(hand) {
    hand = hand.toUpperCase();

    let validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', "10", 'J', 'Q', 'K', 'A'];
    let validSuits = ['C', 'D', 'H', 'S'];

    let suit = '';
    let face = '';

    let newHand = new Hand();

    let cards = hand.split(" ");
    if (cards.length !== 5) {
        return false;
    }

    for (let i = 0; i < cards.length; i++) {
        suit = cards[i].charAt(cards[i].length - 1);
        face = cards[i].slice(0, -1);

        if ((!validFaces.includes(face)) || (!validSuits.includes(suit))) {
            return false;
        }

        let suitVal = 0;
        let faceVal = 0;

        switch (suit) {
            case 'C':
                suitVal = 1;
                break;
            case 'D':
                suitVal = 2;
                break;
            case 'H':
                suitVal = 3;
                break;
            case 'S':
                suitVal = 4;
                break;
        }
        switch (face) {
            case 'A':
                faceVal = 14;
                break;
            case 'K':
                faceVal = 13;
                break;
            case 'Q':
                faceVal = 12;
                break;
            case 'J':
                faceVal = 11;
                break;
            default:
                faceVal = parseInt(face, 10);
                break;
        }

        newHand.add(new Card(suitVal, faceVal));

    }

    return newHand;
}