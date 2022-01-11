import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { gameEffectsMiddleware } from './effects/game-effect-middleware';
import { createGraphQLMiddleware } from './effects/graphql-api-middleware';
import { gameReducer } from './reducers/game-reducer';

export const store = configureStore({
  reducer: gameReducer,
  middleware: [
    // createGraphQLMiddleware("https://rickandmortyapi.com/graphql"),
    createGraphQLMiddleware("/graphql"),
    gameEffectsMiddleware
  ]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
