import { DECK, NUMBER_OF_CARDS } from "./constants";

function dealCard() {
  const index = Math.floor(Math.random() * NUMBER_OF_CARDS);
  return DECK[index];
}

function startGame() {
  const newHand = [];
  for (let index = 0; index < 2; index++) {
    const card = dealCard();
    newHand.push(card);
  }
  // console.log(newHand);
  return newHand;
}

function calculateScore(hand) {
  const scoreArray = hand.map((card) => card.value);

  // console.log("scoreArray", scoreArray);

  let totalScore = scoreArray.reduce((acc, curr) => acc + curr, 0);

  if (totalScore === 21 && hand.length === 2) {
    return 0;
  }

  if (totalScore > 21 && scoreArray.includes(11)) {
    const aceIndex = scoreArray.indexOf(11);
    scoreArray[aceIndex] = 1;
  }

  totalScore = scoreArray.reduce((acc, curr) => acc + curr, 0);

  return totalScore;
}

export { dealCard, startGame, calculateScore };
