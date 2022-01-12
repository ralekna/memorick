import { createAction } from "@reduxjs/toolkit";
import {
  Card,
  GetCharacterCountResponse,
  GetCharacterResponse,
} from "../types";

export const fetchCharactersCount = createAction(
  "fetchCharactersCount",
  () => ({
    payload: {
      query: `query {
          characters {
            info {
              count
            }
          }
        }`,
      variables: {},
    },
    meta: {
      gql: true,
    },
  })
);

export const fetchCharactersCountSuccess =
  createAction<GetCharacterCountResponse>("fetchCharactersCount_SUCCESS");
export const fetchCharactersCountLoading = createAction<undefined>(
  "fetchCharactersCount_LOADING"
);

export const fetchCharacters = createAction(
  "fetchCharacters",
  (ids: number[]) => ({
    payload: {
      query: `
        query getCharacters ($ids: [ID!]!) {
          charactersByIds(ids: $ids) {
            id
            name
            image
          }
        }`,
      variables: { ids },
    },
    meta: {
      gql: true,
    },
  })
);

export const fetchCharactersSuccess = createAction<GetCharacterResponse>(
  "fetchCharacters_SUCCESS"
);
export const fetchCharactersLoading = createAction<GetCharacterResponse>(
  "fetchCharacters_LOADING"
);
export const startGame = createAction<Card[]>("startGame");
export const initializeNewGame = createAction("initializeNewGame");
export const revealCard = createAction<number>("revealCard");
export const checkIfCardsMatch = createAction("checkIfCardsMatch");
export const startApplication = createAction("startApplication");
export const quitGame = createAction("quitGame");
