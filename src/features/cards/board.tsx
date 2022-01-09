import { Card } from "./card";

export function Board() {
  return (
    <div className="board">
      {
        Array.from({ length: 24}, (_, i) => i).map(
          id => 
            <Card id={id} key={id} />
        )
      }
    </div>
  );
}