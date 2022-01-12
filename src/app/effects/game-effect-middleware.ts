import { shuffle } from "../../utils/array";
import {
  fetchCharacters,
  fetchCharactersCount,
  fetchCharactersSuccess,
  initializeNewGame,
  startApplication,
  startGame,
} from "../actions/actions";
import { createEffectsMiddleware } from "../create-effects-middleware";
import { getNewDeck } from "../selectors/game-selectors";
import { GameState } from "../types";

export const gameEffectsMiddleware = createEffectsMiddleware<GameState>([
  [
    initializeNewGame.type,
    ({ dispatch, getState }) =>
      (next) =>
      (action) => {
        dispatch(fetchCharacters(getNewDeck(getState())));
      },
  ],
  [
    startApplication.type,
    ({ dispatch, getState }) =>
      (next) =>
      (action) => {
        const { availableCharactersCount } = getState();
        if (availableCharactersCount === null) {
          dispatch(fetchCharactersCount());
        }
      },
  ],
  [
    fetchCharactersSuccess.type,
    ({ dispatch }) =>
      (next) =>
      (action: ReturnType<typeof fetchCharactersSuccess>) => {
        next(action);
        console.log(`fetchCharactersSuccess.payload`, action.payload);

        dispatch(
          startGame(
            shuffle([
              ...action.payload.charactersByIds,
              ...action.payload.charactersByIds,
            ])
          )
        );
      },
  ],
]);
