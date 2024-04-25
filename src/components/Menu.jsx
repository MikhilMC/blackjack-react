import { useBlackjack } from "../context/BlackjackContext";
import Button from "./Button";

function Menu() {
  const {
    isTableReady,
    isGameOn,
    startNewGame,
    makeDeal,
    takeStand,
    resetGame,
  } = useBlackjack();

  return (
    <div className="my-2 flex items-center justify-center py-2">
      {!isTableReady ? (
        <Button onAction={startNewGame}>New Game</Button>
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
