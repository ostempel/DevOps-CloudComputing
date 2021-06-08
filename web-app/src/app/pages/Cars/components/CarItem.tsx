import './styles/CarItem.scss';

import React from 'react';

import { Grid, Paper } from '@material-ui/core';
import { DriveEta } from '@material-ui/icons';

interface Props {
  car: any;
}

export function CarItem({ car }: Props) {
  return (
    <Paper className="caritem">
      <Grid container className="caritem__content">
        <Grid item xs={1}>
          <DriveEta style={{ height: '30pt', width: '30pt' }} />
        </Grid>
        <Grid item xs={11}>
          <Grid container>
            <Grid item xs={1} className="caritem__content__column">
              ID: {car.id}
            </Grid>
            <Grid item xs={2} className="caritem__content__column">
              Brand: {car.brand}
            </Grid>
            <Grid item xs={2} className="caritem__content__column">
              Model: {car.model}
            </Grid>
            <Grid item xs={3} className="caritem__content__column">
              <div>
                <div>Manufacture Year:</div>
                <div>{new Date(car.manufactureYear).toDateString()}</div>
              </div>
            </Grid>
            <Grid item xs={2} className="caritem__content__column">
              PS: {car.ps}
            </Grid>
            <Grid item xs={2} className="caritem__content__column">
              TopSpeed: {car.topSpeed}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
