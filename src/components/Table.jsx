import Result from "./Result";
import { useBlackjack } from "../context/BlackjackContext";
import Dealer from "./Dealer";
import Menu from "./Menu";
import Player from "./Player";

function Table() {
  const { isTableReady, dealerHand } = useBlackjack();
  return (
    <div>
      <Menu />
      {isTableReady && (
        <>
          <Result dealerFirstCardValue={dealerHand[0].value} />
          <Dealer />
          <Player />
        </>
      )}
    </div>
  );
}

export default Table;
