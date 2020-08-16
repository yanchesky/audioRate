import React from 'react';
import { auth, firestore } from './firebase'

import './App.css';

import Introduction from "./Views/Introduction";
import Voting from "./Views/Voting";
import Result from "./Views/Result"

class App extends React.Component {
  state = {
    currentView: 0,
    user: null,
    token: null,
    submittedVotes: {}
  };

  unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
    let viewToGo = 0;
    if(!!user){
      viewToGo = 1;
      const userRef = firestore
        .collection("users")
        .doc(user.uid);

      const userState = await userRef.get();
      if (userState.exists) {
        viewToGo = 2
      }

      const token = await auth.currentUser.getIdToken(true);
      this.setState({ token })
    }
    this.setState({ user, currentView: viewToGo })
  });

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  gotoNextView = () => {
    this.setState(prevState => ({ currentView: prevState.currentView + 1 }))
  };

  saveAndGoNext = submittedVotes => {
    this.setState({ submittedVotes });
    this.gotoNextView();
  };

  render(){
    const { currentView, token, submittedVotes } = this.state;
    return (
      <div className="App">
        {currentView === 0 &&
          <Introduction nextView={this.gotoNextView} />}

        {currentView === 1 &&
          <Voting token={token} postCallback={this.saveAndGoNext} />}

        {currentView === 2 &&
          <Result submittedVotes={submittedVotes} />
        }
      </div>
    );
  }
}

export default App;
