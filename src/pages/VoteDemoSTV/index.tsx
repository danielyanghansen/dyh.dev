import React from 'react';
import { selectVoteSession, voteActions } from '@/redux/slices/voteSlice';
import {
  getCurrentAlternativeCount,
  iterateSTV,
  returnWinner,
} from '@/services/singleTransferableVote';
import {
  type FakeVoteSession,
  getFruitEmoji,
} from '@/types/singleTransferableVote';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Box, Button, Typography } from '@mui/material';

const VoteDemoSTV: React.FC = () => {
  const fakeVotes = useAppSelector(selectVoteSession);
  const dispatch = useAppDispatch();

  const iterate = (): void => {
    const nextVotes = iterateSTV(fakeVotes);
    dispatch(voteActions.updateVotes(nextVotes.ballots));
  };

  const findWinner = (): void => {
    const counts = getCurrentAlternativeCount(fakeVotes);
    console.log(counts);
    if (Object.values(counts).length <= 1) {
      const winner = returnWinner(fakeVotes);
      dispatch(voteActions.addWinner(winner));
    }
  };

  const reset = (): void => {
    // I don't know why these voteAction action functions require a payload when the respective reducers don't use take any payload arguments
    dispatch(voteActions.resetVotes(0));
    dispatch(voteActions.removeWinnersFromBallots(0));
  };

  const hardReset = (): void => {
    dispatch(voteActions.resetElection(0));
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
      <Box style={{ width: '100%' }}>
        <Box>
          <Button onClick={iterate} variant="contained" color="info">
            Iterate
          </Button>
          <Button onClick={findWinner} variant="contained" color="info">
            Find winner
          </Button>
          <Button onClick={reset} variant="contained" color="info">
            Reset to next round
          </Button>
        </Box>

        <Box
          style={{
            textAlign: 'left',
            marginLeft: '20px',
            marginTop: '20px',
          }}
        >
          <Typography variant="h6">Ballots</Typography>
          <Typography variant="body1">{ballotsAsText(fakeVotes)}</Typography>
        </Box>
        <hr />
        <Box>
          <Box>
            <Typography variant="h5">Winners:</Typography>
            <Typography variant="body1">
              [{' '}
              {fakeVotes.winners
                .map((fruit) => getFruitEmoji(fruit))
                .join(' | ')}{' '}
              ]
            </Typography>
          </Box>
        </Box>
        <br />
        <br />
        <hr />
        <br />

        <Button onClick={hardReset} variant="outlined" color="error">
          Reset election
        </Button>
      </Box>
    </>
  );
};

export default VoteDemoSTV;
