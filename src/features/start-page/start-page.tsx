import memoric from "../../assets/images/memorick.png";
import { initializeNewGame } from "../../app/actions/actions";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getLastResult,
  getTopResults,
} from "../../app/selectors/game-selectors";

export function StartPage() {
  const lastResult = useAppSelector(getLastResult);
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
      {topResults.length ? (
        <div>
          <h2>Last result</h2>
          <div>{lastResult}</div>
          <h2>Top results</h2>
          <ol>
            {topResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
