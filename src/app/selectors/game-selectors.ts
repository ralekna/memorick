import { generateShuffledArray, shuffle } from "../../utils/array";
import { GameResult, GameResultDisplay, GameState } from "../types";

function calculateScore(reveals: number, duration: number): number {
  return Math.round(1_000_000_000 / ((reveals - 23) * (duration / 1000)));
}

const durationFormat = new Intl.DateTimeFormat("en-US", {
  minute: "numeric",
  second: "numeric",
});
const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

function formatResult(result: GameResult): GameResultDisplay {
  const { reveals, duration, endedAt } = result;
  return {
    reveals,
    duration: durationFormat.format(duration),
    score: calculateScore(reveals, duration),
    endedAt: dateFormat.format(endedAt),
  };
}

export const getGameState = (state: GameState) => state;
export const getCurrentGame = (state: GameState) => state.game;

export const getTopResults = ({ results }: GameState) =>
  results
    .slice(0, 10)
    .map(formatResult)
    .sort(({ score: a }, { score: b }) => b - a);

export const getLastResults = ({ results }: GameState): GameResultDisplay[] =>
  results.slice(0, 3).map(formatResult);

export const getNewDeck = ({ availableCharactersCount }: GameState) => {
  let cardsTobeUsedInNextGame = generateShuffledArray(
    1,
    availableCharactersCount!,
    12
  );
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
