const validateFirebaseIdToken =
  (adminInitializedApp) =>
    async (req, res, next) => {
      const hasToken =
        req.headers.authorization && req.headers.authorization.startsWith('Bearer ');
      const hasCookies = req.cookies && req.cookies.__session;

      if (!hasToken && !hasCookies) {
        return res.status(403).send('Unauthorized');
      }

      let idToken;
      if (hasToken) {
        idToken = req.headers.authorization.split('Bearer ')[1];
      } else if(hasCookies) {
        idToken = req.cookies.__session;
      } else {
        return res.status(403).send('Unauthorized');
      }

      try {
        req.user = await adminInitializedApp.auth().verifyIdToken(idToken);
        return next();
      } catch (error) {
        return res.status(403).send('Unauthorized');
      }
    };

const addTwoObjectFields = (dataFromDB, postedVotes) =>
  Object
    .entries(postedVotes)
    .reduce(
      (prev, [key, val]) =>
        ({
          ...prev,
          [key]: prev[key] + val || val
        }),
      dataFromDB
    );

const sumTotalVotes = (dataFromDB, postedVotes) =>
  Object
    .keys(postedVotes)
    .reduce(
      (prev, curr) =>
        ({
          ...prev,
          [curr]: prev[curr] + 1 || 1
        }),
      dataFromDB
    );

const areAllNumbers = votes =>
  Object
    .values(votes)
    .every(voteValue => Number.isInteger(voteValue));

module.exports = {
  userValidation: validateFirebaseIdToken,
  addTwoObjectFields,
  sumTotalVotes,
  areAllNumbers
};
