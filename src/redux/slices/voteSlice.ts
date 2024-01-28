import { type Slice, createSlice } from '@reduxjs/toolkit';

import {
  type FakeVoteSession,
  type FakeVoteFruitBallot,
  FakeVoteFruitAlternatives as Fruit,
} from '@/types/singleTransferableVote';

const originalBallots: FakeVoteFruitBallot[] = [
  { votes: [Fruit.Tomato, Fruit.Banana, Fruit.Apple, Fruit.Orange] },
  { votes: [Fruit.Banana, Fruit.Apple, Fruit.Orange] },
  { votes: [Fruit.Apple, Fruit.Banana, Fruit.Orange] },
  { votes: [Fruit.Orange, Fruit.Banana, Fruit.Apple] },
  { votes: [Fruit.Tomato, Fruit.Banana, Fruit.Apple, Fruit.Orange] },
  { votes: [Fruit.Apple, Fruit.Banana, Fruit.Orange] },
  { votes: [Fruit.Tomato, Fruit.Banana, Fruit.Apple, Fruit.Orange] },
  { votes: [Fruit.Banana, Fruit.Orange, Fruit.Apple] },
  { votes: [Fruit.Tomato, Fruit.Banana, Fruit.Apple, Fruit.Orange] },
  { votes: [Fruit.Banana, Fruit.Apple, Fruit.Orange] },
  { votes: [Fruit.Orange, Fruit.Banana, Fruit.Apple] },
  { votes: [Fruit.Banana, Fruit.Orange, Fruit.Apple] },
  { votes: [Fruit.Tomato, Fruit.Apple, Fruit.Banana, Fruit.Orange] },
  { votes: [Fruit.Tomato, Fruit.Banana, Fruit.Apple, Fruit.Orange] },
  { votes: [Fruit.Orange, Fruit.Apple, Fruit.Banana] },
  { votes: [Fruit.Tomato, Fruit.Banana, Fruit.Apple, Fruit.Orange] },
  { votes: [Fruit.Orange, Fruit.Banana, Fruit.Apple] },
  { votes: [Fruit.Tomato, Fruit.Apple, Fruit.Banana, Fruit.Orange] },
  { votes: [Fruit.Banana, Fruit.Apple, Fruit.Orange] },
  { votes: [Fruit.Orange, Fruit.Banana, Fruit.Apple] },
  { votes: [Fruit.Tomato] },
];

const initialState: FakeVoteSession = {
  ballots: originalBallots,
  winners: [],
};

// create a slice to store the state of the app
export const voteSlice: Slice = createSlice({
  name: 'votes',
  initialState,

  reducers: {
    // reducers go here
    updateVotes: (voteState, action) => {
      voteState.ballots = action.payload;
    },
    resetVotes: (voteState, _) => {
      voteState.ballots = initialState.ballots;
    },
    resetElection: (voteState, _) => {
      voteState.ballots = initialState.ballots;
      voteState.winners = initialState.winners;
    },
    addWinner: (voteState: FakeVoteSession, action) => {
      if (voteState.winners === null || voteState.winners === undefined) {
        voteState.winners = [];
      }
      if (voteState.winners?.includes(action.payload)) {
        return;
      }
      voteState.winners = [...voteState.winners, action.payload];
    },
    removeWinnersFromBallots: (voteState, _) => {
      voteState.ballots = voteState.ballots.map(
        (ballot: FakeVoteFruitBallot) => {
          return {
            votes:
              ballot.votes.filter(
                (vote) => !voteState.winners?.includes(vote),
              ) ?? [],
          };
        },
      );
    },
  },
});

export const { reducer: voteReducer } = voteSlice;
export const { actions: voteActions } = voteSlice;

// This name needs to match the name of the slice in the store
export const selectVoteSession = (state: any): FakeVoteSession =>
  state.voteSession;
