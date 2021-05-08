import React, { useState } from "react";
import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";

var vibrateInterval;

const DisplayError = () => {
  return (
    <Typography variant="h6" align="center">
      Vibration is not supported on this device
    </Typography>
  );
};

const ShowOptions = () => {
  const [isVibrating, setIsVibrating] = useState(false);
  const [pattern, setPattern] = useState("");
  const [isLooping, setIsLooping] = useState(false);
  return (
    <div>
      <TextField
        value={pattern}
        onChange={(e) => {
          setPattern(e.target.value);
        }}
        variant="outlined"
        label="Enter Vibration Pattern"
        fullWidth
      />
      Loop Pattern
      <Switch
        color="primary"
        checked={isLooping}
        onChange={() => {
          setIsLooping(!isLooping);
        }}
      />
      <hr />
      <Button
        fullWidth
        variant={isVibrating ? "outlined" : "contained"}
        color={isVibrating ? "secondary" : "primary"}
        onClick={() => {
          if (isVibrating) {
            setIsVibrating(false);
            clearInterval(vibrateInterval);
            navigator.vibrate(0);
          } else {
            setIsVibrating(true);
            let sum = 0;
            let processedPattern = pattern.split(",").map((e) => {
              let num = parseInt(e);
              sum += num;

              return num * 1000;
            });
            if (processedPattern.length > 1) {
              navigator.vibrate(processedPattern);

              if (isLooping) {
                vibrateInterval = setInterval(() => {
                  navigator.vibrate(processedPattern);
                }, sum * 1000);
              } else {
                setTimeout(() => {
                  setIsVibrating(false);
                }, sum * 1000);
              }
            } else {
              vibrateInterval = setInterval(() => {
                navigator.vibrate(1000);
              }, 1000);
            }
          }
        }}
      >
        {!isVibrating ? "Start Vibration" : "Stop Vibration"}
      </Button>
      <hr />
      <Typography variant="body1">
        <ul>
          <li>
            Pressing the button without entering a pattern causes continous
            vibration
          </li>
          <li>seperate the pattern with ,(commas)</li>
          <li>intervals are to be in seconds</li>
          <li>even intervals are vibrations</li>
          <li>odd intervals are pauses</li>
          <li>you can loop the pattern by swithing loop pattern on</li>
        </ul>
      </Typography>
    </div>
  );
};

function App() {
  return (
    <CssBaseline>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h5">Massager</Typography>
        </Toolbar>
      </AppBar>
      <div>
        <br />
      </div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={10}>
          {navigator.vibrate === undefined ? <DisplayError /> : <ShowOptions />}
        </Grid>
      </Grid>
    </CssBaseline>
  );
}

export default App;
