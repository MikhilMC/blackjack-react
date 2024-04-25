function Card({ cardObj }) {
  // console.log(cardObj);
  return (
    <li className="m-3 flex h-32 w-20 items-center justify-center rounded-md bg-white">
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
