const roundValue = value => Math.round(value * 100) / 100;

export const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const isEmpty = (obj) => Object.keys(obj).length === 0;

export const mapSubmittedVotes = (arrayOfSongs) => ({ totalVotes, voteScores }) => arrayOfSongs
  .map(name => ({
    name: name,
    meanScore: roundValue(voteScores[name] / totalVotes[name]) || 0
  }));

export const mapOwnVotes = (arrayOfSongs) => (votes) => arrayOfSongs
  .map((name) => ({
    name,
    meanScore: votes[name] || 0
  }));