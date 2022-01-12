import memoric from "../../assets/images/memorick.png";
import { initializeNewGame } from "../../app/actions/actions";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getLastResults,
  getTopResults,
} from "../../app/selectors/game-selectors";
import { ResultsDisplay } from "./results-display";

export function StartPage() {
  const lastResults = useAppSelector(getLastResults);
  const topResults = useAppSelector(getTopResults);

  const dispatch = useAppDispatch();
  return (
    <div className="start-page">
      <div className="logo">
        <img alt="Memorick logo" src={memoric} />
      </div>
      <div>
        <button
          className="start-game-button"
          onClick={() => dispatch(initializeNewGame())}
        >
          Start new game
        </button>
      </div>
      {lastResults.length ? (
        <div>
          <h2>Last results</h2>
          <ResultsDisplay results={lastResults} />
          <h2>Top results</h2>
          <ResultsDisplay results={topResults} />
        </div>
      ) : null}
    </div>
  );
}
