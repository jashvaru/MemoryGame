const cardArray = [
    {
        name: "fries",
        img: 'images/fries.png'
    },
    {
        name: "cheeseburger",
        img: 'images/cheeseburger.png'
    },
    {
        name: "hotdog",
        img: 'images/hotdog.png'
    },
    {
        name: "ice-cream",
        img: 'images/ice-cream.png'
    },
    {
        name: "milkshake",
        img: 'images/milkshake.png'
    },
    {
        name: "pizza",
        img: 'images/pizza.png'
    },
    {
        name: "fries",
        img: "images/fries.png"
    },
    {
        name: "cheeseburger",
        img: 'images/cheeseburger.png'
    },
    {
        name: "hotdog",
        img: 'images/hotdog.png'
    },
    {
        name: "ice-cream",
        img: 'images/ice-cream.png'
    },
    {
        name: "milkshake",
        img: 'images/milkshake.png'
    },
    {
        name: "pizza",
        img: 'images/pizza.png'
    }
];


cardArray.sort(() => 0.5 - Math.random())
console.table(cardArray)

/* collecting element objs */
const scoreDisp = document.querySelector('#score');
const timeDisp = document.querySelector('#time')
const gridDisp = document.querySelector('#grid');
const reload = document.querySelector('#reload');

let chosenCard = [];
let matchCount = 0;
let timeleft = 30;

/* This func add img elements to the div element to creat a grid */
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        gridDisp.appendChild(card); //appending img element to the div element
        card.addEventListener('click', flipcard);
    }
}

/* This function is called whenever a card is clicked */
function flipcard() {
    const cardObj = {};
    console.log(this);
    const cardId = this.getAttribute('data-id'); //'this' here will refer to the element obj that called event listener i.e. <img>

    cardObj.cardName = cardArray[cardId].name;
    cardObj.cardIdNum = cardId;
    chosenCard.push(cardObj); //pushing data of clicked card into an array 

    this.setAttribute('src', cardArray[cardId].img);//showing the actual img of item when card is clicked

    if (chosenCard.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {

    const card = document.querySelectorAll('#grid img');
    console.log(card);
    if (chosenCard[0].cardIdNum === chosenCard[1].cardIdNum) {                  //check if the same card is clicked twice
        card[chosenCard[0].cardIdNum].setAttribute('src', 'images/blank.png');
        alert("You have clicked the same card");
    } else if (chosenCard[0].cardName === chosenCard[1].cardName) {             //check if the chosen card are same
        card[chosenCard[0].cardIdNum].setAttribute('src', 'images/white.png'); // if yes then remove the pair
        card[chosenCard[1].cardIdNum].setAttribute('src', 'images/white.png');
        card[chosenCard[0].cardIdNum].removeEventListener('click', flipcard);
        card[chosenCard[1].cardIdNum].removeEventListener('click', flipcard);
        matchCount++;
        scoreDisp.innerHTML = matchCount;
        console.log(matchCount);
    } else {                                                                  //if chosen card are not same than retry
        card[chosenCard[0].cardIdNum].setAttribute('src', 'images/blank.png');
        card[chosenCard[1].cardIdNum].setAttribute('src', 'images/blank.png');
    }

    if (matchCount === cardArray.length / 2) {
        clearInterval(downloadTimer);
        alert("Congrates reeeeee");

    }

    chosenCard = [];
}

/* Timer */
let downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
        clearInterval(downloadTimer);
        alert("Time up, time up sir time up");
    }
    timeDisp.innerHTML = timeleft;
    timeleft -= 1;
}, 1000);

/* Reload webpage */
reload.addEventListener('click', () => window.location.reload());

createBoard();




