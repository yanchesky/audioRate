const functions = require('firebase-functions');
const admin = require("firebase-admin");
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')({
  origin: ['https://emce-95615.firebaseapp.com', 'https://emce-95615.web.app', 'http://localhost:3000'],
});

const serviceAccount = require("./credentials.json");
const {
  userValidation,
  addTwoObjectFields,
  sumTotalVotes,
  areAllNumbers
} = require('./helpers');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://emce-95615.firebaseio.com"
});
const app = express();

const postFunction = async (req, res) => {
  if(!req.body.votes) res.status(400).send('Votes not included');
  const { votes:postedVotes } = req.body;
  if(!areAllNumbers(postedVotes)) res.status(400).send('All votes must be integers');

  const userRef = admin
    .firestore()
    .collection('users')
    .doc(req.user.uid);

  const DBref = admin
    .firestore()
    .collection('votes')
    .doc('sum');

  const userState = await userRef.get();
  if (userState.exists) return res.status(403).send('Already voted');

  const DBstate = await DBref.get();
  const dataFromDB = DBstate.data();

  await DBref.set({
    voteScores: dataFromDB ? addTwoObjectFields(dataFromDB.voteScores, postedVotes) : postedVotes,
    totalVotes: dataFromDB ?
      sumTotalVotes(dataFromDB.totalVotes, postedVotes) :
      sumTotalVotes({}, postedVotes)
  });

  await userRef.set({
    name: req.user.name,
    timestamp: new Date(),
  });

  return res.status(201).send('Votes posted successfully');
};

app.use(cors);
app.use(cookieParser());
app.use(userValidation(admin));
app.post('/', postFunction);

exports.postVotes = functions.region('europe-west3').https.onRequest(app);