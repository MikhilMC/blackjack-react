import Card from "./Card";

function Player({ hand }) {
  return (
    <ul className="flex flex-row place-content-center">
      {hand.map((cardObj, index) => (
        <Card key={index} cardObj={cardObj} />
      ))}
    </ul>
  );
}

export default Player;
