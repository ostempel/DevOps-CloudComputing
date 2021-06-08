import './styles/CarsService.scss';

import React from 'react';

import { Grid, IconButton, Link } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { CarGet } from './components/CarGet';
import { CarsList } from './components/CarsList';
import { CarCreate } from './components/CarCreate';
import { CarUpdate } from './components/CarUpdate';
import { CarDelete } from './components/CarDelete';

export function Cars() {
  return (
    <Grid container className="carsservice">
      <Grid item xs={12} className="carsservice__headline">
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
          <h1>Cars-Service</h1>
        </Grid>
      </Grid>
      <Grid container className="carsservice__content">
        <CarsList />
      </Grid>
      <Grid container className="carsservice__content">
        <CarGet />
      </Grid>
      <Grid container className="carsservice__content">
        <CarCreate />
      </Grid>
      <Grid container className="carsservice__content">
        <CarUpdate />
      </Grid>
      <Grid container className="carsservice__content">
        <CarDelete />
      </Grid>
    </Grid>
  );
}
