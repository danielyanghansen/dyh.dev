import type {
  FakeVoteSession,
  FakeVoteFruitAlternatives,
} from '@/types/singleTransferableVote';
import _ from 'lodash';

/**
 *
 * @param voteSession
 * @returns A list of the most common fruit alternatives in the vote session. This is a list because there can be ties.
 */
export const getMostCommonFruitAlternatives = (
  voteSession: FakeVoteSession,
): FakeVoteFruitAlternatives[] => {
  const fruitCounts = getCurrentAlternativeCount(voteSession);
  const mostCommonFruitCount = Math.max(...Object.values(fruitCounts));

  const mostCommonFruits: FakeVoteFruitAlternatives[] = [];
  Object.entries(fruitCounts).forEach(([fruit, count]) => {
    if (count === mostCommonFruitCount) {
      mostCommonFruits.push(Number(fruit) as FakeVoteFruitAlternatives);
    }
  });

  return mostCommonFruits;
};

export const getLeastCommonFruitAlternatives = (
  voteSession: FakeVoteSession,
): FakeVoteFruitAlternatives[] => {
  const fruitCounts = getCurrentAlternativeCount(voteSession);

  const leastCommonFruitCount = Math.min(...Object.values(fruitCounts));

  const leastCommonFruits: FakeVoteFruitAlternatives[] = [];
  Object.entries(fruitCounts).forEach(([fruit, count]) => {
    if (count === leastCommonFruitCount) {
      leastCommonFruits.push(Number(fruit) as FakeVoteFruitAlternatives);
    }
  });

  return leastCommonFruits;
};

export const getCurrentAlternativeCount = (
  voteSession: FakeVoteSession,
): Record<number, number> => {
  const fruitCounts: Record<number, number> = {};
  voteSession.ballots.forEach((ballot) => {
    const votes = ballot.votes;
    if (votes?.[0]) {
      fruitCounts[votes[0]] = fruitCounts[votes[0]]
        ? fruitCounts[votes[0]] + 1
        : 1;
    }
  });

  return fruitCounts;
};

// Important to make a new list, so that preact signals is triggered
export const iterateSTV = (session: FakeVoteSession): FakeVoteSession => {
  // Make a copy of the session

  const transformedBallots: FakeVoteSession = _.cloneDeep(session);

  const fruitCounts = getCurrentAlternativeCount(transformedBallots);
  // If there is only one fruit alternative left, we have a winner
  if (Object.keys(fruitCounts).length <= 1) {
    // TODO: This is a hack to get the winner. We should probably do this in a better way
    return transformedBallots;
  }

  const leastCommonFruits = getLeastCommonFruitAlternatives(transformedBallots);

  transformedBallots.ballots.forEach((ballot) => {
    const votes = ballot.votes;

    if (votes?.[0] && leastCommonFruits.includes(votes[0])) {
      votes.shift();
    }
  });

  return transformedBallots;
};

export const totalVoteCount = (session: FakeVoteSession): number => {
  let count = 0;
  session.ballots.forEach((ballot) => {
    count += ballot.votes.length;
  });

  return count;
};
