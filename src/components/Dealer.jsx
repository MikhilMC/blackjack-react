import { useBlackjack } from "../context/BlackjackContext";
import Card from "./Card";

function Dealer() {
  const { dealerHand, isGameOn } = useBlackjack();
  const blankCardObject = { suit: "", name: "" };
  const cards = isGameOn ? [dealerHand[0], blankCardObject] : dealerHand;

  // console.log(hand);
  return (
    <ul className="flex flex-row place-content-center">
      {cards.map((cardObj, index) => (
        <Card key={index} cardObj={cardObj} />
      ))}
    </ul>
  );
}

export default Dealer;
