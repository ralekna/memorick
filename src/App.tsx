import { useEffect } from "react";
import { startApplication } from "./app/actions/actions";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getGameState } from "./app/selectors/game-selectors";
import { Board } from "./features/game/board";
import { StartPage } from "./features/start-page/start-page";

export function App() {
  const { game, loading } = useAppSelector(getGameState);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(startApplication());
  }, [])

  return (
    <main>
      {
        loading 
          ? <h2>Loading...</h2> 
          : game 
            ? <Board /> 
            : <StartPage />}
    </main>
  );
}
