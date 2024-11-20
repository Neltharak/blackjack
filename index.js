

const playerHand = []
const dealerHand = []
let playerSum
let dealerSum
let gameButtonsEl = document.getElementById("gamebutton")
let hitButtonsEl = document.getElementById("hitbutton")
let retryButtonEl = document.getElementById("retrybutton")
let headerEl = document.getElementById("header-el")



function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }


function displayCard(value){

}

function displayHands(){
    let handString = "Your hand:"
    for (card of playerHand)
        handString = handString.concat(" ", card.toString())

    console.log(handString)
    console.log(`Your total: ${playerSum}`)
    handString = "Dealer's Hand:"
    for (card of dealerHand)
        handString = handString.concat(" ", card.toString())
    console.log(handString)
    console.log(`Dealer's sum : ${dealerSum}`)
}

function calculateHand(hand){
    let localsum = 0
    let numberOfAces = 0

    if (hand.length == 2)
        if (hand.includes(1) && hand.includes(10))
            return 21

    for (card of hand){
        if (card != 1)
            localsum += card
        else
            numberOfAces++
    }

    if ((localsum + numberOfAces) == 21)
        localsum == 21
    else if (((localsum + numberOfAces - 1) + 11) == 21)   
        localsum == 21
    else
        localsum += numberOfAces
    return localsum
}

function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

function loadCard(player, value){

    imgstring = ""
    valuestring = ""
    let img
    targetDiv = document.getElementById(`player${player}`)

    if (value < 10)
        valuestring = '0' + value.toString()
    else
        valuestring = getRandomItem([10, 11, 12, 13]).toString()
    imgstring = getRandomItem(['d', 'c', 'h', 's']) + valuestring
    
        img = document.createElement("img");
        img.classList.add('card')
        img.classList.add(`player${player}`)
        img.src = "img/Cards/Modern/" + imgstring + '.png'
    targetDiv.prepend(img)
}

function drawCard(player)
{   
    rng = getRandomInt(1, 11)
    loadCard(player, rng)
    return rng
}

function clearHands(){
    playerHand.length = 0
    dealerHand.length = 0

    let cards = document.getElementsByClassName("card");
		[...cards].forEach(p => {p.remove(); })
}

function initializeGame()
{
    clearHands()
    headerEl.textContent = "Gambling is bad for you"
    //retryButtonEl.style.display = "none"
    //gameButtonsEl.style.display = "flex"
    retryButtonEl.classList.add("hidden")
    gameButtonsEl.classList.remove("hidden")
    hitButtonsEl.classList.remove("hidden")
    
    playerHand.push(drawCard(1), drawCard(1))
    dealerHand.push(drawCard(0))
    playerSum = calculateHand(playerHand)
    dealerSum = calculateHand(dealerHand)
    game()
}

function blackJack()
{
    retryButtonEl.classList.remove("hidden")
    gameButtonsEl.classList.add("hidden")
    hitButtonsEl.classList.add("hidden")

    headerEl.textContent = "BLACKJACK BABY !"
}

function playerWin(){
        headerEl.textContent = "Yay you won!"
        retryButtonEl.classList.remove("hidden")
        gameButtonsEl.classList.add("hidden")
        hitButtonsEl.classList.add("hidden")
}


function rekt()
{
    headerEl.textContent = "YOU LOSE! Told you gambling was bad!"
    retryButtonEl.classList.remove("hidden")
    gameButtonsEl.classList.add("hidden")
    hitButtonsEl.classList.add("hidden")

}

function stay()
{
    while (dealerSum < 17 || dealerHand.length == 1){
        dealerHand.push(drawCard(0))
        dealerSum = calculateHand(dealerHand)
    }
    displayHands()    
    if (playerSum >= dealerSum || dealerSum > 21){
        headerEl.textContent = "Yay you won!"
        retryButtonEl.classList.remove("hidden")
        gameButtonsEl.classList.add("hidden")
        hitButtonsEl.classList.add("hidden")

    }
    else if (playerSum === dealerSum){
        headerEl.textContent = "Tie !"
        retryButtonEl.classList.remove("hidden")
        gameButtonsEl.classList.add("hidden")
        hitButtonsEl.classList.add("hidden")
    }
    else
        rekt()
}

function retry()
{
    initializeGame()
}


function hit()
{
    playerHand.push(drawCard(1))
    playerSum = calculateHand(playerHand)
    if (dealerSum < 17 || dealerHand.length == 1)
        dealerHand.push(drawCard(0))
    dealerSum = calculateHand(dealerHand)
    if (dealerSum > 21)
        playerWin()
    game()
}

function game()
{
    displayHands()
    if (playerSum === 21 && playerHand.length == 2)
        blackJack()
    else if (playerSum > 21)
        rekt()
}

initializeGame()