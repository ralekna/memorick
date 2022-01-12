import { MouseEventHandler } from "react";
import {
  checkIfCardsMatch as checkIfCardsMatchAction,
  quitGame as quitGameAction,
} from "../../app/actions/actions";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getBoard } from "../../app/selectors/game-selectors";
import { Card } from "./card";

export function Board() {
  const cards = useAppSelector(getBoard);
  const dispatch = useAppDispatch();
  const checkIfCardsMatch: MouseEventHandler<HTMLDivElement> = dispatch.bind(
    null,
    checkIfCardsMatchAction()
  );
  const quitGame = dispatch.bind(null, quitGameAction());
  return (
    <>
      <div>
        <button onClick={quitGame} className="end-game-button">
          x
        </button>
      </div>
      <div className="board" onMouseUpCapture={checkIfCardsMatch}>
        {cards?.map(({ id, image, revealed }, index) => (
          <Card
            id={id}
            index={index}
            open={revealed}
            image={image}
            key={index}
          />
        ))}
      </div>
    </>
  );
}
