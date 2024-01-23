import { type Slice, createSlice } from '@reduxjs/toolkit';

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
    { votes: [Fruit.Tomato] },
  ],
};

// create a slice to store the state of the app
export const voteSlice: Slice = createSlice({
  name: 'votes',
  initialState: defaultFruitBallots,

  reducers: {
    // reducers go here
    updateVotes: (voteState, action) => {
      voteState.ballots = action.payload;
    },
    resetVotes: (voteState, _) => {
      voteState = defaultFruitBallots;
    },
  },
});

export const { reducer: voteReducer } = voteSlice;
export const { actions: voteActions } = voteSlice;

// This name needs to match the name of the slice in the store
export const selectVoteSession = (state: any): FakeVoteSession =>
  state.voteSession;
