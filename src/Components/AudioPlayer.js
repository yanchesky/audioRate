import React from 'react';
import ReactAudioPlayer from "react-audio-player";

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const AudioPlayer = ({ selectedRadioGroup, onSelect, fileName }) => {

  return (
    <div style={{margin: "50px 20px"}}>
      <div>
        <ReactAudioPlayer
          className="audio-player"
          src={`audio/${fileName}`}
          controls
          width="500px"
        />
      </div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Wystaw ocenę</FormLabel>
        <RadioGroup row aria-label="gender" name="gender1" value={selectedRadioGroup} onChange={onSelect}>
          {
            [...Array(10).keys()].map(el =>
              <FormControlLabel value={el + 1} control={<Radio />} label={el + 1} />
            )
          }
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default AudioPlayer;