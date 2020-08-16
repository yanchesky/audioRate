This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## General Info

RateAudio is application build on React, Firebase Functions and Database.
for voting songs in collection. It picks X songs from collection to vote on and display result if user
successfully posted a vote.

## Setup Firebase

To run application follow steps below:
1. Create Firebase project on https://firebase.google.com/
1. In your project: 
    - Select Authentication -> Sign-In method and allow login with Google
    - Select Database and create firestore database and setup database access rules
1. Install node.js if you don't have it already. You can check if is installed typing `node -v`
1. Install Firebase CLI `npm install -g firebase-tools`. You can check if is installed typing `firebase --version`.
1. Login to firebase CLI `firebase login`
1. Clone this repository and go to cloned directory `cd audioRate`
1. Install Google Functions dependencies: `npm --prefix functions install`
1. Init project by typing `firebase init` and select everything by typing 'a'. Don't overwrite files if asked.
1. (Optionally) Setup emulators for hosting and functions. It provides environment for testing and debugging
1. Select existing project
1. Bind downloaded repository with your created firebase project: `firebase use --add` and select you project

1. To make functions accessible your firestore database go to firebase console -> settings -> service accounts and generate new private key at bottom.
1. Place downloaded file in functions directory and rename it to `credentials.json`.
1. Run `firebase serve --only functions`

## Setup React 

1. In firebase console add your firebase app to web app.
1. Go to settings and choose your web app and select configuration
1. Copy credentials and go to project's src directory.
1. Paste credentials in firebase_credentials.js and type on last line export default (variable config name). In most cases 'firebaseConfig'
1. Install dependencies `npm install`

1. Make .env file in project root directory
    - Paste function url in .env file in `REACT_APP_API_URL`
    - Make list of audio files separated by space. By default should look like this `REACT_APP_SONGS_LIST=CantinaBand3.wav preamble10.wav` 
1. Type `npm start` to run app locally and go to http://localhost:3000 once it's done.

## Deploy Project

1. To deploy function type `firebase deploy --only functions`
1. Select hosting firebase and register application.
1. Copy url of deployed function and replace it .env file. Url can be found in firebase console https://console.firebase.google.com/ under Functions tab
1. To deploy app type: `npm run build` and then `firebase deploy --only hosting`
