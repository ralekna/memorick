export type Card = {
  id: string;
  name: string;
  image: string;
}

export type Game = {
  activeCards: number[];
  cards: {
      matched: boolean;
      id: string;
      image: string;
  }[];
  startTime: number;
  reveals: number;
  matchedCards: number;
}

export type GameResult = {
  duration: number;
  reveals: number;
  endedAt: Date;
}

export type GameState = {
  loading: boolean;
  availableCharactersCount: number | null;
  game: Game | null;
  results: GameResult[];
}

export type GetCharacterResponse = {
  charactersByIds: Card[];
}

export type GetCharacterCountResponse = {
  characters: {
    info: {
      count: number;
    };
  };
};