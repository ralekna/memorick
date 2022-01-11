import { generateShuffledArray, shuffle } from "../../utils/array";
import { GameState } from "../types";

function calculateResultDisplay(reveals: number, duration: number): number {
  return Math.round(1_000_000_000 / ((reveals - 23) * (duration / 1000)));
}

export const getGameState = (state: GameState) => state;

export const getCurrentGame = (state: GameState) => state.game;

export const getTopResults = (state: GameState) =>
  state.results
    .concat()
    .map(({ reveals, duration }) => {
      return calculateResultDisplay(reveals, duration);
    })
    .sort((a, b) => b - a)
    .slice(0, 10);

export const getLastResult = ({ results }: GameState): number | null => {
  const lastResult = results[results.length - 1];
  if (lastResult) {
    return calculateResultDisplay(lastResult.reveals, lastResult.duration);
  } else {
    return null;
  }
};

export const getNewDeck = ({ availableCharactersCount }: GameState) => {
  let cardsTobeUsedInNextGame = generateShuffledArray(1, availableCharactersCount!, 12);
  return shuffle([...cardsTobeUsedInNextGame, ...cardsTobeUsedInNextGame]);
};

export const getBoard = ({ game }: GameState) =>
  game?.cards.map(({ id, image, matched }, index) => {
    return {
      id,
      image,
      revealed: matched || game.activeCards.includes(index),
    };
  });

export const getMatchedCardsNum = ({ game }: GameState): number =>
  game?.cards.reduce((count, card) => count + (card.matched ? 1 : 0), 0) || 0;
