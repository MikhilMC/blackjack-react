import { useBlackjack } from "../context/BlackjackContext";
import TextDescription from "./TextDescription";

function Result({ dealerFirstCardValue }) {
  const { playerScore, dealerScore, isGameOn, result } = useBlackjack();

  // console.log("playerScore", playerScore);
  // console.log("dealerScore", dealerScore);
  return (
    <div className="flex flex-col items-center justify-center">
      {isGameOn ? (
        <TextDescription
          mainText="Dealer's first card value: "
          spanValue={dealerFirstCardValue}
        />
      ) : (
        <TextDescription mainText="Dealer score: " spanValue={dealerScore} />
      )}
      <TextDescription mainText="Player score: " spanValue={playerScore} />
      {result !== "" && (
        <TextDescription mainText="Result: " spanValue={result} />
      )}
    </div>
  );
}

export default Result;
