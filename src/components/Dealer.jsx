import Card from "./Card";

function Dealer({ hand, isGameOn }) {
  const blankCardObject = { suit: "", name: "" };
  const cards = isGameOn ? [hand[0], blankCardObject] : hand;

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
