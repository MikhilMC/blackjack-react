import { useBlackjack } from "../context/BlackjackContext";

function Header() {
  const { balanceAmount } = useBlackjack();
  return (
    <h1 className="text-center text-5xl">
      <span>♠️</span> <span className="text-red-700">♥️</span> <span>♣️</span>{" "}
      <span className="text-red-700">♦️</span>
      <br />
      <span className="my-28 text-white">BLACKJACK</span>
      <p className="py-2 text-xl">
        Your current balance is{" "}
        <span className="font-bold">{balanceAmount}</span>
      </p>
    </h1>
  );
}

export default Header;
