import './styles/RacetrackGet.scss';

import { Field, Formik } from 'formik';
import { loader } from 'graphql.macro';
import React, { useState } from 'react';

import { useQuery } from '@apollo/client';
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
} from '@material-ui/core';

import { RacetrackItem } from './RacetrackItem';

const RACETRACK_QUERY = loader('../../../../gql/query/GetRacetrack.gql');

export function RacetrackGet() {
  const [racetrackId, setRacetrackId] = useState<number | null>(null);
  const { loading, data, error } = useQuery(RACETRACK_QUERY, {
    skip: racetrackId === null ? true : false,
    variables: { id: racetrackId },
  });
  const handleSubmit = values => {
    const id = values.id;

    if (!isNaN(id)) {
      setRacetrackId(null);
      setRacetrackId(parseInt(values.id, 10));
    }
  };

  return (
    <Paper elevation={5} className="racetrackget">
      <h1 className="racetrackget__headline">Racetracks-Get</h1>
      {loading ? (
        <CircularProgress className="racetrackget__loading" />
      ) : error !== undefined ? (
        <h1 className="racetrackget__error">Error fetching racetrack...</h1>
      ) : data !== undefined &&
        data.racetrack === null &&
        racetrackId !== null ? (
        <h1 className="racetrackget__error">Not Found</h1>
      ) : (
        data !== undefined &&
        data.racetrack(
          <div>
            <RacetrackItem racetrack={data.racetrack} />
          </div>,
        )
      )}
      <Formik
        initialValues={{}}
        onSubmit={values => {
          handleSubmit(values);
        }}
      >
        {({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} className="racetrackget__form">
                <Grid item xs={12} className="racetrackget__form__field">
                  <Field as={TextField} name="id" label="Id" required />
                </Grid>
                <Grid item xs={12} className="racetrackget__form__field">
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </Paper>
  );
}
