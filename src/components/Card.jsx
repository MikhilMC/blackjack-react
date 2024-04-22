function Card({ cardObj }) {
  // console.log(cardObj);
  return (
    <li className="w-20 bg-white rounded-md m-3 h-32 flex items-center justify-center">
      <span
        className={`${
          cardObj.suit === "♥️" || cardObj.suit === "♦️"
            ? "text-red-700"
            : "text-black"
        } text-3xl font-bold`}
      >
        {cardObj.suit} {cardObj.name}
      </span>
    </li>
  );
}

export default Card;
