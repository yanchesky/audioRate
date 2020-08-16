import React from 'react';
import Chart from '../Components/Chart'

import { firestore } from "../firebase";

import {isEmpty, mapOwnVotes, mapSubmittedVotes} from '../helpers'

const songsList = process.env.REACT_APP_SONGS_LIST.split(' ');
const mapVotes = mapSubmittedVotes(songsList);
const mapSelfVotes = mapOwnVotes(songsList);
class Result extends React.Component {
  state = {
    data: {voteScores: {}, totalVotes: {}}
  };

  async componentDidMount() {
    const response = await firestore
      .collection("votes")
      .doc("sum")
      .get();
    
    const data = response.data();
    this.setState({ data })
  }

  render() {
    const { totalVotes, voteScores } = this.state.data;
    const { submittedVotes } = this.props;
    const chartData = mapVotes({ totalVotes, voteScores });
    const isSubmitedDataEmpty = isEmpty(submittedVotes);
    const ownVotes = !isSubmitedDataEmpty ? mapSelfVotes(submittedVotes) : null;
    return (
      <>
        <p>Dziękujemy za udział w badaniu!</p>

        {!isSubmitedDataEmpty &&
          <p>Poniżej są Twoje wylosowane pliki audio i oceny jakie wystawiłeś.</p>
        }
        {!isSubmitedDataEmpty &&
          <Chart data={ownVotes} />
        }

        <p>Tutaj widać uśrednione oceny wszystkich ankietowanych:</p>

        <Chart data={chartData} />
      </>
    );
  }
}

export default Result;