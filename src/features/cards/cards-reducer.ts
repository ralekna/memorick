import { createReducer } from "action-matchers";

type State = {
  openCards: number[];
}

const initialState: State = {
  openCards: []
};

export const cardsReducer = createReducer([
  
], initialState)