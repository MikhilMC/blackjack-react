import Button from "./Button";

function Menu({ onNewGame, onDeal, onStand, onReset, isTableReady, isGameOn }) {
  return (
    <div className="my-2 py-2 flex items-center justify-center">
      {!isTableReady ? (
        <Button onAction={onNewGame}>New Game</Button>
      ) : (
        <>
          <Button onAction={onDeal} isDisabled={!isGameOn}>
            Deal
          </Button>
          <Button onAction={onStand} isDisabled={!isGameOn}>
            Stand
          </Button>
          <Button onAction={onReset} isDisabled={isGameOn}>
            Reset
          </Button>
        </>
      )}
    </div>
  );
}

export default Menu;
