type Props = {
  id: number;
}

export function Card({id}: Props) {
  return (
    <div className="card">
      {id}
    </div>
  );
}