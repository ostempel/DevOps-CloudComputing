import './styles/DriversService.scss';

import React from 'react';

import { Grid, IconButton, Link } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { DriverGet } from './components/DriverGet';
import { DriversList } from './components/DriversList';
import { DriverCreate } from './components/DriverCreate';
import { DriverUpdate } from './components/DriverUpdate';
import { DriverDelete } from './components/DriverDelete';

export function Drivers() {
  return (
    <Grid container className="driversservice">
      <Grid item xs={12} className="driversservice__headline">
        <Grid
          container
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Link href="http://localhost:3000">
            <IconButton color="primary" component="span">
              <ArrowBackIosIcon
                style={{ color: 'white', height: '30pt', width: '30pt' }}
              />
            </IconButton>
          </Link>
          <h1>Drivers-Service</h1>
        </Grid>
      </Grid>
      <Grid container className="driversservice__content">
        <DriversList />
      </Grid>
      <Grid container className="driversservice__content">
        <DriverGet />
      </Grid>
      <Grid container className="driversservice__content">
        <DriverCreate />
      </Grid>
      <Grid container className="driversservice__content">
        <DriverUpdate />
      </Grid>
      <Grid container className="driversservice__content">
        <DriverDelete />
      </Grid>
    </Grid>
  );
}
