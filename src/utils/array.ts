// Taken from https://bost.ocks.org/mike/shuffle/ (last one)
export function shuffle<T = any>(arrayToShuffle: T[]): T[] {
  let array = arrayToShuffle.concat(); // let's not be destructive
  let remainingElementsLength = array.length;
  let lastOfRemainingElements: T;
  let randomIndexInRemainingElements: number;

  // While there remain elements to shuffle…
  while (remainingElementsLength) {
    // Pick a remaining element…
    randomIndexInRemainingElements = Math.floor(
      Math.random() * remainingElementsLength--
    );

    // And swap it with the current element.
    lastOfRemainingElements = array[remainingElementsLength];
    array[remainingElementsLength] = array[randomIndexInRemainingElements];
    array[randomIndexInRemainingElements] = lastOfRemainingElements;
  }

  return array;
}

// TODO: memoize this function
export function generateShuffledArray(
  from: number,
  to: number,
  length: number
): number[] {
  console.assert(from !== undefined);
  console.assert(to !== undefined);
  console.assert(length !== undefined);
  console.assert(to - from >= length);
  console.assert(to > from);
  return shuffle(
    Array.from({ length: Math.abs(to - from) }, (_, index) => from + index)
  ).slice(0, length);
}
