import classNames from "classnames";
import { MouseEventHandler } from "react";
import { revealCard as revealCardAction } from "../../app/actions/actions";
import { useAppDispatch } from "../../app/hooks";

type Props = {
  index: number;
  id: string;
  image: string;
  open: boolean;
};

export function Card({ index, id, image, open }: Props) {
  const dispatch = useAppDispatch();
  const revealCard: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!open) {
      console.log(`open`, open);
      dispatch(revealCardAction(index));
    } else {
      event.preventDefault();
    }
  };
  return (
    <div className={classNames({ card: true, open })} data-testid={`card-${index}`} onMouseDown={revealCard}>
      <div className="face back">
        {/* <span>{id}</span> <-- uncomment for cheat */}
      </div>
      <div className="face front">
        <img src={image} alt="" />
      </div>
    </div>
  );
}
