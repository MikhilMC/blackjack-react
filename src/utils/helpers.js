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

function checkResultOnStartGame(playerScore, dealerScore) {
  if (playerScore === 0 && dealerScore === 0) {
    return "Draw";
  } else if (playerScore === 0) {
    return "Player won";
  } else if (dealerScore === 0) {
    return "Player lost";
  } else return "";
}

function checkResultDuringGame(playerScore) {
  return playerScore > 21 ? "Player lost" : "";
}

function checkResultAfterGameOver(playerScore, dealerScore) {
  if (playerScore === dealerScore) {
    return "Draw";
  } else if (dealerScore > 21) {
    return "Player won";
  } else if (playerScore <= 21 && dealerScore <= 21) {
    if (playerScore > dealerScore) {
      return "Player won";
    } else {
      return "Player lost";
    }
  } else return "";
}

export {
  dealCard,
  startGame,
  calculateScore,
  checkResultOnStartGame,
  checkResultDuringGame,
  checkResultAfterGameOver,
};
