import React from 'react';
import AudioPlayer from "../Components/AudioPlayer";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";

const SHOWN_ITEMS = 2;
const songList = process.env.REACT_APP_SONGS_LIST.split(' ');

class Voting extends React.Component {
  state = {
    loading: false,
    ratingTable: songList
      .slice(-SHOWN_ITEMS)
      .reduce((prev, curr) => ({...prev, [curr]: 0}) ,{})
  };

  rate = sample => event => {
    const value = event.target.value;
    this.setState(({ ratingTable }) => ({ ratingTable: {...ratingTable, [sample]: +value }}))
  };

  postScores = async () => {
    const { ratingTable:votes } = this.state;
    this.setState({ loading: true});
    try{
      await axios.post(
        process.env.REACT_APP_API_URL,
        { votes },
        {headers: { Authorization: `Bearer ${this.props.token}`}}
        );
      this.props.postCallback(votes);
      this.setState({ loading: false})
    } catch(error){
      console.error(error)
    }
  };

  render() {
    const { ratingTable, loading } = this.state;
    const allVoted = Object
      .values(ratingTable)
      .every(ratingValue => ratingValue !== 0);
    
    return (
      <div>
        <p className="voting-text">
          Poniżej znajdują się 2 losowo wybrane nagrania. Oceń każde z nich, wybierając jedną liczbę w skali od 1-10,
          przy czym 1 oznacza “Zdecydowanie mi się nie podoba”, a 10 oznacza
          “Zdecydowanie mi się podoba”.
        </p>
        {Object
          .keys(ratingTable)
          .map((ratingIdentifier, index) => <>
            <p>{ratingIdentifier}</p>
            <AudioPlayer
              key={index}
              onSelect={this.rate(ratingIdentifier)}
              selectedRadioGroup={ratingTable[ratingIdentifier]}
              fileName={ratingIdentifier}
            /></>)
        }
        <Button
          disabled={!allVoted || loading}
          onClick={this.postScores}
          variant="contained"
          color="primary"
        >
          {loading ? <CircularProgress size={24} /> : 'Wyślij oceny'}
        </Button>
      </div>
    );
  }
}

export default Voting;