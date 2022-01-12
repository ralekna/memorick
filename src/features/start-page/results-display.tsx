import { GameResultDisplay } from "../../app/types";

export function ResultsDisplay({ results }: { results: GameResultDisplay[] }) {
  console.log(`results`, results);

  return (
    <ol className="results-display">
      {results.map(({ duration, reveals, endedAt, score }, index) => (
        <li key={index}>
          Score: {score} | duration: {duration} | clicks: {reveals}
        </li>
      ))}
    </ol>
  );
}
