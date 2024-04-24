import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Table from "./components/Table";
import Menu from "./components/Menu";
import { calculateScore, dealCard, startGame } from "./utils/helpers";
import Result from "./components/Result";

const initialSetup = {
  playerHand: [],
  dealerHand: [],
  playerScore: 0,
  dealerScore: 0,
  isTableReady: false,
  isGameOn: false,
  result: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "game/start":
      return {
        ...state,
        isTableReady: true,
        isGameOn: true,
        playerHand: action.payload.newPlayerHand,
        dealerHand: action.payload.newDealerHand,
      };

    case "game/deal":
      return {
        ...state,
        playerHand: [...state.playerHand, action.payload],
      };

    case "game/stand":
      return { ...state, isGameOn: false, dealerHand: action.payload };

    case "game/reset":
      return {
        ...state,
        playerHand: [],
        dealerHand: [],
        isTableReady: false,
        result: "",
      };

    case "game/updateScore":
      return {
        ...state,
        playerScore: action.payload.newPlayerScore,
        dealerScore: action.payload.newDealerScore,
      };

    case "game/over":
      return { ...state, isGameOn: false, result: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

function App() {
  const [
    {
      playerHand,
      dealerHand,
      playerScore,
      dealerScore,
      isTableReady,
      isGameOn,
      result,
    },
    dispatch,
  ] = useReducer(reducer, initialSetup);

  useEffect(
    function () {
      if (playerHand.length >= 2 && dealerHand.length >= 2) {
        const newPlayerScore = calculateScore(playerHand);
        const newDealerScore = calculateScore(dealerHand);
        let newResult = "";
        if (playerHand.length === 2 && dealerHand.length === 2) {
          if (newPlayerScore === 0 && newDealerScore === 0) {
            newResult = "Draw";
          } else if (newPlayerScore === 0) {
            newResult = "Player won";
          } else if (newDealerScore === 0) {
            newResult = "Player lost";
          }
        } else {
          if (isGameOn) {
            if (newPlayerScore > 21) {
              newResult = "Player lost";
            }
          } else {
            if (newPlayerScore === newDealerScore) {
              newResult = "Draw";
            } else if (newDealerScore > 21) {
              newResult = "Player won";
            } else if (newPlayerScore <= 21 && newDealerScore <= 21) {
              if (newPlayerScore > newDealerScore) {
                newResult = "Player won";
              } else {
                newResult = "Player lost";
              }
            }
          }
        }
        if (newResult.length > 0) {
          dispatch({ type: "game/over", payload: newResult });
        }
        dispatch({
          type: "game/updateScore",
          payload: { newPlayerScore, newDealerScore },
        });
      }
    },
    [playerHand, dealerHand, isGameOn]
  );

  function handleNewGame() {
    const newPlayerHand = startGame();
    const newDealerHand = startGame();
    dispatch({ type: "game/start", payload: { newPlayerHand, newDealerHand } });
  }

  function handleDeal() {
    const newCard = dealCard();
    dispatch({ type: "game/deal", payload: newCard });
  }

  function handleStand() {
    let currentDealerHand = dealerHand;
    let currentDealerScore = dealerScore;
    while (currentDealerScore <= 17) {
      const newCard = dealCard();
      currentDealerHand = [...currentDealerHand, newCard];
      currentDealerScore = calculateScore(currentDealerHand);
    }
    dispatch({ type: "game/stand", payload: currentDealerHand });
  }

  function handleReset() {
    dispatch({ type: "game/reset" });
  }

  return (
    <div className="grid place-content-center bg-green-600 h-screen">
      <Header />
      <Menu
        onNewGame={handleNewGame}
        onDeal={handleDeal}
        onStand={handleStand}
        onReset={handleReset}
        isTableReady={isTableReady}
        isGameOn={isGameOn}
      />
      {isTableReady && (
        <>
          <Result
            playerScore={playerScore}
            dealerScore={dealerScore}
            dealerFirstCardValue={dealerHand[0].value}
            isGameOn={isGameOn}
            result={result}
          />
          <Table
            playerHand={playerHand}
            dealerHand={dealerHand}
            isGameOn={isGameOn}
          />
        </>
      )}
    </div>
  );
}

export default App;
