import { createContext, useContext, useEffect, useReducer } from "react";
import {
  calculateScore,
  checkResultAfterGameOver,
  checkResultDuringGame,
  checkResultOnStartGame,
  dealCard,
  startGame,
} from "../utils/helpers";

const BlackjackContext = createContext();

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

function BlackjackProvider({ children }) {
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
          if (isGameOn) {
            newResult = checkResultOnStartGame(newPlayerScore, newDealerScore);
          } else {
            newResult = checkResultAfterGameOver(
              newPlayerScore,
              newDealerScore
            );
          }
        } else {
          if (isGameOn) {
            newResult = checkResultDuringGame(newPlayerScore);
          } else {
            newResult = checkResultAfterGameOver(
              newPlayerScore,
              newDealerScore
            );
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

  function startNewGame() {
    const newPlayerHand = startGame();
    const newDealerHand = startGame();
    dispatch({ type: "game/start", payload: { newPlayerHand, newDealerHand } });
  }

  function makeDeal() {
    const newCard = dealCard();
    dispatch({ type: "game/deal", payload: newCard });
  }

  function takeStand() {
    let currentDealerHand = dealerHand;
    let currentDealerScore = dealerScore;
    while (currentDealerScore <= 17) {
      const newCard = dealCard();
      currentDealerHand = [...currentDealerHand, newCard];
      currentDealerScore = calculateScore(currentDealerHand);
    }
    dispatch({ type: "game/stand", payload: currentDealerHand });
  }

  function resetGame() {
    dispatch({ type: "game/reset" });
  }

  return (
    <BlackjackContext.Provider
      value={{
        playerHand,
        dealerHand,
        playerScore,
        dealerScore,
        isTableReady,
        isGameOn,
        result,
        startNewGame,
        makeDeal,
        takeStand,
        resetGame,
      }}
    >
      {children}
    </BlackjackContext.Provider>
  );
}

function useBlackjack() {
  const context = useContext(BlackjackContext);
  if (context === undefined)
    throw new Error("BlackjackContext was used outside the BlackjackProvider");

  return context;
}

export { BlackjackProvider, useBlackjack };
