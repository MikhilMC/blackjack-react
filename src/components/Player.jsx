import { useBlackjack } from "../context/BlackjackContext";
import Card from "./Card";

function Player() {
  const { playerHand } = useBlackjack();
  return (
    <ul className="flex flex-row place-content-center">
      {playerHand.map((cardObj, index) => (
        <Card key={index} cardObj={cardObj} />
      ))}
    </ul>
  );
}

export default Player;
