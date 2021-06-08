import './styles/HomePage.scss';

import * as React from 'react';

import { Grid, Paper } from '@material-ui/core';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import Person from '@material-ui/icons/Person';

import { ServiceLink } from './components/ServiceLink';

export function HomePage() {
  return (
    <Grid container className="homePage">
      <Grid item xs={5} className="homePage__headline">
        <h1>DevOps &</h1>
        <h1>CloudComputing</h1>
      </Grid>
      <Grid item xs={5} className="homePage__paper">
        <Paper elevation={5} className="homePage__paper__content">
          <div className="homePage__paper__content__headline">
            <p>Services</p>
          </div>
          <div className="homePage__paper__content__servicelink">
            <ServiceLink
              url="http://localhost:3000/cars"
              title="Cars-Service"
              icon={<DriveEtaIcon style={{ height: '30pt', width: '30pt' }} />}
            />
            <ServiceLink
              url="http://localhost:3000/drivers"
              title="Drivers-Service"
              icon={<Person style={{ height: '30pt', width: '30pt' }} />}
            />
            <ServiceLink
              url="http://localhost:3000/racetracks"
              title="Racetracks-Service"
              icon={
                <LocalGasStationIcon
                  style={{ height: '30pt', width: '30pt' }}
                />
              }
            />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
