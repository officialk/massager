import React, { useState } from "react";
import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
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

const ShowOptions = ({ isVibrating, setIsVibrating }) => {
  return (
    <div>
      <Button
        variant={isVibrating ? "outlined" : "contained"}
        color={isVibrating ? "secondary" : "primary"}
        onClick={() => {
          if (isVibrating) {
            setIsVibrating(false);
            clearInterval(vibrateInterval);
            navigator.vibrate(0);
          } else {
            setIsVibrating(true);
            vibrateInterval = setInterval(() => {
              navigator.vibrate(1000);
            }, 1000);
          }
        }}
      >
        {isVibrating ? "Start Vibration" : "Stop Vibration"}
      </Button>
    </div>
  );
};

function App() {
  const [isVibrating, setIsVibrating] = useState(false);
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
        {navigator.vibrate === undefined ? (
          <DisplayError />
        ) : (
          <ShowOptions
            isVibrating={isVibrating}
            setIsVibrating={setIsVibrating}
          />
        )}
      </Grid>
    </CssBaseline>
  );
}

export default App;
