import React from 'react';
import { selectVoteSession, voteActions } from '@/redux/slices/voteSlice';
import {
  getCurrentAlternativeCount,
  iterateSTV,
  totalVoteCount,
} from '@/services/singleTransferableVote';
import {
  type FakeVoteSession,
  getFruitName,
  getFruitEmoji,
} from '@/types/singleTransferableVote';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Button } from '@mui/material';

const VoteDemoSTV: React.FC = () => {
  const fakeVotes = useAppSelector(selectVoteSession);
  const dispatch = useAppDispatch();

  const iterate = (): void => {
    const nextVotes = iterateSTV(fakeVotes);
    dispatch(voteActions.updateVotes(nextVotes.ballots));
  };

  const ballotsAsText = (ballotsToDisplay: FakeVoteSession): JSX.Element[] => {
    console.log(ballotsToDisplay);

    return ballotsToDisplay.ballots.map((ballot, i) => {
      const ballotAsText = ballot.votes
        .map((fruit, j) => {
          return getFruitEmoji(fruit);
        })
        .join(',\t');

      const BallotText =
        'Stemmeseddel ' + (i + 1) + ' : [' + ballotAsText + ']';

      return (
        <div key={i}>
          <span>{BallotText} </span>
        </div>
      );
    });
  };

  // Left adjust the text

  return (
    <>
      <Button onClick={iterate}>Iterate</Button>
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
