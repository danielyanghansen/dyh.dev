export enum FakeVoteFruitAlternatives {
  Tomato = 1,
  Banana = 2,
  Apple = 3,
  Orange = 4,
}

// Ordered list of alternatives. Can be empty. Very simple type here
export interface FakeVoteFruitBallot {
  votes: FakeVoteFruitAlternatives[];
}
export interface FakeVoteSession {
  ballots: FakeVoteFruitBallot[];
}

export const getFruitName = (fruit: FakeVoteFruitAlternatives): string => {
  switch (fruit) {
    case FakeVoteFruitAlternatives.Tomato:
      return 'Tomato';
    case FakeVoteFruitAlternatives.Banana:
      return 'Banana';
    case FakeVoteFruitAlternatives.Apple:
      return 'Apple';
    case FakeVoteFruitAlternatives.Orange:
      return 'Orange';
  }
};

export const getFruitColor = (fruit: FakeVoteFruitAlternatives): string => {
  switch (fruit) {
    case FakeVoteFruitAlternatives.Tomato:
      return 'red';
    case FakeVoteFruitAlternatives.Banana:
      return 'yellow';
    case FakeVoteFruitAlternatives.Apple:
      return 'green';
    case FakeVoteFruitAlternatives.Orange:
      return 'orange';
  }
};
