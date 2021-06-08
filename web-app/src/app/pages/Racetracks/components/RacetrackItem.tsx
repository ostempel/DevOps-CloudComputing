import './styles/RacetrackItem.scss';

import React from 'react';

import { Grid, Paper } from '@material-ui/core';
import { LocalGasStation } from '@material-ui/icons';

interface Props {
  racetrack: any;
}

export function RacetrackItem({ racetrack }: Props) {
  return (
    <Paper className="racetrackitem">
      <Grid container className="racetrackitem__content">
        <Grid item xs={1}>
          <LocalGasStation style={{ height: '30pt', width: '30pt' }} />
        </Grid>
        <Grid item xs={11}>
          <Grid container>
            <Grid item xs={1} className="racetrackitem__content__column">
              ID: {racetrack.id}
            </Grid>
            <Grid item xs={4} className="racetrackitem__content__column">
              Name: {racetrack.name}
            </Grid>
            <Grid item xs={4} className="racetrackitem__content__column">
              Country: {racetrack.country}
            </Grid>
            <Grid item xs={3} className="racetrackitem__content__column">
              Length: {racetrack.length} meters
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
