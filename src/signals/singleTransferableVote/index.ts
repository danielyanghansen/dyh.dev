import { signal } from '@preact/signals-react';

import {
  type FakeVoteSession,
  FakeVoteFruitAlternatives as Fruit,
} from '@/types/singleTransferableVote';

const defaultFruitBallots: FakeVoteSession = {
  ballots: [
    { votes: [Fruit.Tomato, Fruit.Banana, Fruit.Apple, Fruit.Orange] },
    { votes: [Fruit.Banana, Fruit.Apple, Fruit.Orange] },
    { votes: [Fruit.Apple, Fruit.Banana, Fruit.Orange] },
    { votes: [Fruit.Orange, Fruit.Banana, Fruit.Apple] },
    { votes: [Fruit.Banana, Fruit.Tomato, Fruit.Apple, Fruit.Orange] },
    { votes: [Fruit.Apple, Fruit.Banana, Fruit.Orange] },
    { votes: [Fruit.Banana, Fruit.Apple, Fruit.Orange, Fruit.Tomato] },
    { votes: [Fruit.Banana, Fruit.Orange, Fruit.Apple] },
    { votes: [Fruit.Tomato, Fruit.Banana, Fruit.Apple, Fruit.Orange] },
    { votes: [Fruit.Banana, Fruit.Apple, Fruit.Orange] },
    { votes: [Fruit.Orange, Fruit.Banana, Fruit.Apple] },
    { votes: [Fruit.Banana, Fruit.Orange, Fruit.Apple] },
    { votes: [Fruit.Apple, Fruit.Banana, Fruit.Orange, Fruit.Tomato] },
    { votes: [Fruit.Banana, Fruit.Tomato, Fruit.Apple, Fruit.Orange] },
    { votes: [Fruit.Orange, Fruit.Apple, Fruit.Banana] },
    { votes: [Fruit.Banana, Fruit.Apple, Fruit.Orange, Fruit.Tomato] },
    { votes: [Fruit.Orange, Fruit.Banana, Fruit.Apple] },
    { votes: [Fruit.Tomato, Fruit.Apple, Fruit.Banana, Fruit.Orange] },
    { votes: [Fruit.Banana, Fruit.Apple, Fruit.Orange] },
    { votes: [Fruit.Orange, Fruit.Banana, Fruit.Apple] },
  ],
};
export const fakeVotesSignal = signal<FakeVoteSession>(defaultFruitBallots);
export const fakeVotesWinnerSignal = signal<Fruit | null>(null);
