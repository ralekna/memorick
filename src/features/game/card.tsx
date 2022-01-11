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
    console.log(`In card: revealCard, open: `, open);
    if (!open) {
      dispatch(revealCardAction(index));
    } else {
      event.preventDefault();
    }
  };
  return (
    <div className={classNames({ card: true, open })} onMouseDown={revealCard}>
      <div className="face back">{id}</div>
      <div className="face front"><img src={image} /></div>
    </div>
  );
}
