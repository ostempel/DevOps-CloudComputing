import './styles/RacetrackDelete.scss';

import { useMutation } from '@apollo/client';
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
} from '@material-ui/core';
import { Field, Formik } from 'formik';
import { loader } from 'graphql.macro';
import React from 'react';
import { RacetrackItem } from './RacetrackItem';

const RACETRACK_DELETE = loader('../../../../gql/mutation/DeleteRacetrack.gql');

export function RacetrackDelete() {
  const [deleteRacetrack, { data, error, loading }] = useMutation(
    RACETRACK_DELETE,
  );

  const handleSubmit = async values => {
    if (values.id && !isNaN(values.id)) {
      values.id = parseInt(values.id, 10);
    }
    await deleteRacetrack({
      variables: {
        id: values.id,
      },
      refetchQueries: ['GetRacetracks'],
    }).catch(err => {});
  };

  return (
    <Paper elevation={5} className="racetrackdelete">
      <h1 className="racetrackdelete__headline">Racetrack-Delete</h1>
      {loading ? (
        <CircularProgress className="racetrackdelete__loading" />
      ) : error !== undefined ? (
        <h1 className="racetrackdelete__error">Error deleting racetrack...</h1>
      ) : data !== undefined && data.deleteRacetrack === null ? (
        <h1 className="racetrackdelete__error">Not Found</h1>
      ) : (
        data !== undefined &&
        data.deleteRacetrack !== null && (
          <div>
            <RacetrackItem racetrack={data.deleteRacetrack} />
          </div>
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
              <Grid container spacing={3} className="racetrackdelete__form">
                <Grid item xs={12} className="racetrackdelete__form__field">
                  <Field as={TextField} name="id" label="ID" required />
                </Grid>
                <Grid item xs={12} className="racetrackdelete__form__field">
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
