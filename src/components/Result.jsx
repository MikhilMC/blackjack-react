function Result({
  playerScore,
  dealerScore,
  dealerFirstCardValue,
  isGameOn,
  result,
}) {
  // console.log("playerScore", playerScore);
  // console.log("dealerScore", dealerScore);
  return (
    <div className="flex items-center flex-col justify-center">
      {isGameOn ? (
        <p className="text-2xl">
          Dealer's first card value :{" "}
          <span className="font-semibold">{dealerFirstCardValue}</span>
        </p>
      ) : (
        <p className="text-2xl">
          Dealer score : <span className="font-semibold">{dealerScore}</span>
        </p>
      )}
      <p className="text-2xl">
        Player score : <span className="font-semibold">{playerScore}</span>
      </p>
      {result !== "" && <p className="text-2xl font-semibold">{result}</p>}
    </div>
  );
}

export default Result;
