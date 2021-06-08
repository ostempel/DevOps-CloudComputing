import './styles/RacetracksService.scss';

import React from 'react';

import { Grid, IconButton, Link } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { RacetrackGet } from './components/RacetrackGet';
import { RacetracksList } from './components/RacetracksList';
import { RacetrackCreate } from './components/RacetrackCreate';
import { RacetrackUpdate } from './components/RacetrackUpdate';
import { RacetrackDelete } from './components/RacetrackDelete';

export function Racetracks() {
  return (
    <Grid container className="racetracksservice">
      <Grid item xs={12} className="racetracksservice__headline">
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
          <h1>Racetracks-Service</h1>
        </Grid>
      </Grid>
      <Grid container className="racetracksservice__content">
        <RacetracksList />
      </Grid>
      <Grid container className="racetracksservice__content">
        <RacetrackGet />
      </Grid>
      <Grid container className="racetracksservice__content">
        <RacetrackCreate />
      </Grid>
      <Grid container className="racetracksservice__content">
        <RacetrackUpdate />
      </Grid>
      <Grid container className="racetracksservice__content">
        <RacetrackDelete />
      </Grid>
    </Grid>
  );
}
