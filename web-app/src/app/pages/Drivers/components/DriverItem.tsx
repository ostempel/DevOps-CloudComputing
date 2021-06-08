import './styles/DriverItem.scss';

import React from 'react';

import { Grid, Paper } from '@material-ui/core';
import { Person } from '@material-ui/icons';

interface Props {
  driver: any;
}

export function DriverItem({ driver }: Props) {
  return (
    <Paper className="driveritem">
      <Grid container className="driveritem__content">
        <Grid item xs={1}>
          <Person style={{ height: '30pt', width: '30pt' }} />
        </Grid>
        <Grid item xs={11}>
          <Grid container>
            <Grid item xs={1} className="driveritem__content__column">
              ID: {driver.id}
            </Grid>
            <Grid item xs={3} className="driveritem__content__column">
              First Name: {driver.firstName}
            </Grid>
            <Grid item xs={3} className="driveritem__content__column">
              Last Name: {driver.lastName}
            </Grid>
            <Grid item xs={3} className="driveritem__content__column">
              <div>
                <div>Birth Date:</div>
                <div>{new Date(driver.birthDate).toDateString()}</div>
              </div>
            </Grid>
            <Grid item xs={2} className="driveritem__content__column">
              Country: {driver.country}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
