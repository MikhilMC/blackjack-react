import { useEffect, useState } from "react";
import Header from "./components/Header";
import Table from "./components/Table";
import Menu from "./components/Menu";
import { calculateScore, dealCard, startGame } from "./utils/helpers";
import Result from "./components/Result";

function App() {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [isTableReady, setIsTableReady] = useState(false);
  const [isGameOn, setIsGameOn] = useState(false);
  const [result, setResult] = useState("");

  // console.log("playerScore", playerScore);
  // console.log("dealerScore", dealerScore);

  useEffect(
    function () {
      if (playerHand.length >= 2 && dealerHand.length >= 2) {
        const newPlayerScore = calculateScore(playerHand);
        const newDealerScore = calculateScore(dealerHand);
        let newResult = "";
        if (playerHand.length === 2 && dealerHand.length === 2) {
          if (newPlayerScore === 0 && newDealerScore === 0) {
            // console.log(1);
            newResult = "Draw";
          } else if (newPlayerScore === 0) {
            // console.log(2);
            newResult = "Player won";
          } else if (newDealerScore === 0) {
            // console.log(3);
            newResult = "Player lost";
          }
        } else {
          if (isGameOn) {
            if (newPlayerScore > 21) {
              console.log(5);
              newResult = "Player lost";
            }
          } else {
            if (newPlayerScore === newDealerScore) {
              // console.log(7);
              newResult = "Draw";
            } else if (newDealerScore > 21) {
              // console.log(8);
              newResult = "Player won";
            } else if (newPlayerScore <= 21 && newDealerScore <= 21) {
              // console.log(9);
              if (newPlayerScore > newDealerScore) {
                // console.log(10);
                newResult = "Player won";
              } else {
                // console.log(11);
                newResult = "Player lost";
              }
            }
          }
        }
        if (newResult.length > 0) {
          setIsGameOn(false);
          setResult(newResult);
        }
        setPlayerScore(newPlayerScore);
        setDealerScore(newDealerScore);
      }
    },
    [playerHand, dealerHand, isGameOn]
  );

  function handleNewGame() {
    setIsTableReady(true);
    setIsGameOn(true);
    setPlayerHand(startGame());
    setDealerHand(startGame());
  }

  function handleDeal() {
    setPlayerHand((currentHand) => [...currentHand, dealCard()]);
  }

  function handleStand() {
    setIsGameOn(false);
    let currentDealerHand = dealerHand;
    let currentDealerScore = dealerScore;
    while (currentDealerScore <= 17) {
      const newCard = dealCard();
      currentDealerHand = [...currentDealerHand, newCard];
      currentDealerScore = calculateScore(currentDealerHand);
    }
    setDealerHand(currentDealerHand);
  }

  function handleReset() {
    setPlayerHand([]);
    setDealerHand([]);
    setIsTableReady(false);
    setResult("");
  }

  return (
    <div className="grid place-content-center bg-green-600 h-screen">
      <Header />
      <Menu
        onNewGame={handleNewGame}
        onDeal={handleDeal}
        onStand={handleStand}
        onReset={handleReset}
        isTableReady={isTableReady}
        isGameOn={isGameOn}
      />
      {isTableReady && (
        <>
          <Result
            playerScore={playerScore}
            dealerScore={dealerScore}
            dealerFirstCardValue={dealerHand[0].value}
            isGameOn={isGameOn}
            result={result}
          />
          <Table
            playerHand={playerHand}
            dealerHand={dealerHand}
            isGameOn={isGameOn}
          />
        </>
      )}
    </div>
  );
}

export default App;
