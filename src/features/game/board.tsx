import { MouseEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getBoard } from "../../app/selectors/game-selectors";
import { Game } from "../../app/types";
import { Card } from "./card";
import { checkIfCardsMatch as checkIfCardsMatchAction } from "../../app/actions/actions";

type Props = {
  game: Game;
}

export function Board() {

  const cards = useAppSelector(getBoard);
  const dispatch = useAppDispatch();
  const checkIfCardsMatch: MouseEventHandler<HTMLDivElement> = () => {
    dispatch(checkIfCardsMatchAction());
  }

  return (
    <div className="board" onMouseUpCapture={checkIfCardsMatch}>
      {
        cards?.map(
          ({id, image, revealed }, index) => 
            <Card id={id} index={index} open={revealed} image={image} key={index} />
        )
      }
    </div>
  );
}