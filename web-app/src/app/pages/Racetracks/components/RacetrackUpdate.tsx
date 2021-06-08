import './styles/RacetrackUpdate.scss';

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
import { omit, omitBy } from 'lodash';

const RACETRACK_UPDATE = loader('../../../../gql/mutation/UpdateRacetrack.gql');

export function RacetrackUpdate() {
  const [updateRacetrack, { data, error, loading }] = useMutation(
    RACETRACK_UPDATE,
  );

  const handleSubmit = async values => {
    let saveBody = { ...omit(values, ['id']) };
    if (values.id && !isNaN(values.id)) {
      values.id = parseInt(values.id, 10);
    }
    if (values.length && !isNaN(values.length)) {
      saveBody.length = parseInt(saveBody.length, 10);
    }
    await updateRacetrack({
      variables: {
        id: values.id,
        data: omitBy(saveBody, v => v === null || v === ''),
      },
      refetchQueries: ['GetRacetracks'],
    }).catch(err => {});
  };

  return (
    <Paper elevation={5} className="racetrackupdate">
      <h1 className="racetrackupdate__headline">Racetrack-Update</h1>
      {loading ? (
        <CircularProgress className="racetrackupdate__loading" />
      ) : error !== undefined ? (
        <h1 className="racetrackupdate__error">Error updating racetrack...</h1>
      ) : data !== undefined && data.updateRacetrack === null ? (
        <h1 className="racetrackdelete__error">Not Found</h1>
      ) : (
        data !== undefined && (
          <div>
            <RacetrackItem racetrack={data.updateRacetrack} />
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
              <Grid container spacing={3} className="racetrackupdate__form">
                <Grid item xs={12} className="racetrackupdate__form__field">
                  <Field as={TextField} name="id" label="ID" required />
                </Grid>
                <Grid item xs={12} className="racetrackcreate__form__field">
                  <Field as={TextField} name="name" label="Name" />
                </Grid>
                <Grid item xs={12} className="racetrackcreate__form__field">
                  <Field as={TextField} name="country" label="country" />
                </Grid>
                <Grid item xs={12} className="racetrackcreate__form__field">
                  <Field as={TextField} name="country" label="Country" />
                </Grid>
                <Grid item xs={12} className="racetrackupdate__form__field">
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
