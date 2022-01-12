import { Action, createReducer } from "action-matchers";
import {
  checkIfCardsMatch,
  fetchCharactersCountSuccess,
  quitGame,
  revealCard,
  startGame,
} from "../actions/actions";
import { getMatchedCardsNum } from "../selectors/game-selectors";
import { Game, GameState } from "../types";

const initialState: GameState = {
  loading: false,
  availableCharactersCount: null,
  game: null,
  results: [],
};

const BOARD_SIZE = 24;

export const gameReducer = createReducer<GameState>(
  [
    [
      startGame.type,
      (state, action: ReturnType<typeof startGame>) => {
        const deck = action.payload;
        const game: Game = {
          activeCards: [],
          cards: deck.map(({ id, image }) => ({ matched: false, id, image })),
          startTime: Date.now(),
          reveals: 0,
          matchedCards: 0,
        };
        return { ...state, game };
      },
    ],
    [
      fetchCharactersCountSuccess.type,
      (state, action: ReturnType<typeof fetchCharactersCountSuccess>) => {
        return {
          ...state,
          availableCharactersCount: action.payload.characters.info.count,
        };
      },
    ],
    [
      /_(LOADING|COMPLETED)$/,
      (state, { type }: Action) => {
        return {
          ...state,
          loading: type.endsWith("_LOADING"),
        };
      },
    ],
    [
      revealCard.type,
      (state, { payload: card }: ReturnType<typeof revealCard>) => {
        const { game } = state;
        if (game && game.activeCards.length <= 1) {
          if (game.activeCards[0] === card) {
            return state;
          }
          return {
            ...state,
            game: {
              ...game,
              activeCards: [...game.activeCards, card],
              reveals: game.reveals + 1,
            },
          };
        } else {
          console.error("Trying to reveal more than two cards at once");
        }
        return state;
      },
    ],
    [
      checkIfCardsMatch.type,
      (state, action) => {
        const { game } = state;
        if (game && game.activeCards.length >= 2) {
          const [card1Index, card2Index] = game.activeCards;
          const card1 = game.cards[card1Index];
          const card2 = game.cards[card2Index];
          if (card1.id === card2.id) {
            const cards = game.cards.concat();
            cards[card1Index] = { ...card1, matched: true };
            cards[card2Index] = { ...card2, matched: true };

            // those matched before and these two
            const matchedCardsNum = getMatchedCardsNum(state) + 2;
            if (matchedCardsNum >= BOARD_SIZE) {
              // end game
              return {
                ...state,
                game: null,
                results: [
                  {
                    reveals: game.reveals,
                    duration: Date.now() - game.startTime,
                    endedAt: Date.now(),
                  },
                  ...state.results,
                ],
              };
            } else {
              return { ...state, game: { ...game, cards, activeCards: [] } };
            }
          } else {
            return { ...state, game: { ...game, activeCards: [] } };
          }
        } else {
          return state;
        }
      },
    ],
    [quitGame.type, (state, action) => {
      return {...state, game: null}
    }],
  ],
  initialState
);
