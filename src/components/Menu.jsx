import { useState } from "react";
import { useBlackjack } from "../context/BlackjackContext";
import Button from "./Button";

function Menu() {
  const {
    isTableReady,
    isGameOn,
    balanceAmount,
    startNewGame,
    makeDeal,
    takeStand,
    resetGame,
  } = useBlackjack();

  const [betAmount, setBetAmount] = useState("");

  function handleBet(e) {
    const newAmount = e.target.value;
    if (Number(newAmount) > balanceAmount) {
      alert(
        "Your balance amount is too low. Please enter a lesser bet amount or reload.",
      );
      setBetAmount("");
    } else {
      setBetAmount(newAmount);
    }
  }

  function handleNewGame() {
    startNewGame(Number(betAmount));
    setBetAmount("");
  }

  return (
    <div className="my-2 flex items-center justify-center py-2">
      {!isTableReady ? (
        <>
          <input
            type="number"
            className="rounded-md px-2 py-3.5"
            placeholder="Enter bet amount"
            value={betAmount}
            onChange={handleBet}
          />
          <Button onAction={handleNewGame}>New Game</Button>
        </>
      ) : (
        <>
          <Button onAction={makeDeal} isDisabled={!isGameOn}>
            Deal
          </Button>
          <Button onAction={takeStand} isDisabled={!isGameOn}>
            Stand
          </Button>
          <Button onAction={resetGame} isDisabled={isGameOn}>
            Reset
          </Button>
        </>
      )}
    </div>
  );
}

export default Menu;
