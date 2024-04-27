import { useBlackjack } from "../context/BlackjackContext";
import Card from "./Card";

function Player() {
  const { playerHand } = useBlackjack();
  return (
    <ul className="flex max-w-64 flex-row place-content-center justify-evenly overflow-x-scroll sm:container sm:overflow-x-hidden">
      {playerHand.map((cardObj, index) => (
        <Card key={index} cardObj={cardObj} />
      ))}
    </ul>
  );
}

export default Player;
