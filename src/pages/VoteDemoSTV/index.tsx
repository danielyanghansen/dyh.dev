import React from 'react';
import { selectVoteSession, voteActions } from '@/redux/slices/voteSlice';
import { iterateSTV, totalVoteCount } from '@/services/singleTransferableVote';
import {
  type FakeVoteSession,
  getFruitName,
} from '@/types/singleTransferableVote';
import { useAppDispatch, useAppSelector } from '@/redux/store';

const VoteDemoSTV: React.FC = () => {
  const fakeVotes = useAppSelector(selectVoteSession);
  const dispatch = useAppDispatch();

  const iterate = (): void => {
    console.log('1: ', totalVoteCount(fakeVotes), fakeVotes);
    const nextVotes = iterateSTV(fakeVotes);
    console.log('2: ', totalVoteCount(nextVotes), nextVotes);
    dispatch(voteActions.updateVotes(nextVotes.ballots));
    console.log('3: ', totalVoteCount(fakeVotes), fakeVotes);
  };

  const ballotsAsText = (ballotsToDisplay: FakeVoteSession): JSX.Element[] => {
    console.log(ballotsToDisplay);

    return ballotsToDisplay.ballots.map((ballot, i) => {
      const ballotAsText = ballot.votes
        .map((fruit, j) => {
          return getFruitName(fruit);
        })
        .join(',\t');

      return (
        <div key={i}>
          <span>Ballot {i + 1}: </span>
          {ballotAsText}
        </div>
      );
    });
  };

  // Left adjust the text

  return (
    <>
      <button onClick={iterate}>Iterate</button>
      <div
        style={{
          textAlign: 'left',
          marginLeft: '20px',
          marginTop: '20px',
        }}
      >
        {ballotsAsText(fakeVotes)}
      </div>
    </>
  );
};

export default VoteDemoSTV;
