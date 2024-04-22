import Dealer from "./Dealer";
import Player from "./Player";

function Table({ playerHand, dealerHand, isGameOn }) {
  return (
    <div>
      <Dealer hand={dealerHand} isGameOn={isGameOn} />
      <Player hand={playerHand} />
    </div>
  );
}

export default Table;
