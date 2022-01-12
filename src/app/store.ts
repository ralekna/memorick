import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import { gameEffectsMiddleware } from "./effects/game-effect-middleware";
import { createGraphQLMiddleware } from "./effects/graphql-api-middleware";
import { gameReducer } from "./reducers/game-reducer";

const persistConfig = {
  key: "root",
  storage,
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, gameReducer),
  middleware: [
    // createGraphQLMiddleware("https://rickandmortyapi.com/graphql"),
    createGraphQLMiddleware("/graphql"), // Routing through proxy
    gameEffectsMiddleware,
  ],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
