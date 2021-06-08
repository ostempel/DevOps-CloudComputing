import './styles/RacetrackCreate.scss';

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

const RACETRACK_CREATE = loader('../../../../gql/mutation/CreateRacetrack.gql');

export function RacetrackCreate() {
  const [addRacetrack, { data, error, loading }] = useMutation(
    RACETRACK_CREATE,
  );

  const handleSubmitClick = async values => {
    let saveBody = values;
    if (!isNaN(values.length)) {
      saveBody.length = parseInt(saveBody.length, 10);
    }
    await addRacetrack({
      variables: { data: { ...saveBody } },
      refetchQueries: ['GetRacetracks'],
    }).catch(err => {});
  };

  return (
    <Paper elevation={5} className="racetrackcreate">
      <h1 className="racetrackcreate__headline">Racetrack-Create</h1>
      {loading ? (
        <CircularProgress className="racetrackcreate__loading" />
      ) : error !== undefined ? (
        <div>
          <h1 className="racetrackcreate__error">
            Error creating racetrack...
          </h1>
        </div>
      ) : (
        data !== undefined && (
          <div>
            <RacetrackItem racetrack={data.createRacetrack} />
          </div>
        )
      )}
      <Formik
        initialValues={{}}
        onSubmit={values => {
          handleSubmitClick(values);
        }}
      >
        {({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} className="racetrackcreate__form">
                <Grid item xs={12} className="racetrackcreate__form__field">
                  <Field as={TextField} name="name" label="Name" required />
                </Grid>
                <Grid item xs={12} className="racetrackcreate__form__field">
                  <Field
                    as={TextField}
                    name="country"
                    label="Country"
                    required
                  />
                </Grid>
                <Grid item xs={12} className="racetrackcreate__form__field">
                  <Field
                    as={TextField}
                    name="length"
                    label="Length in meters"
                    required
                  />
                </Grid>
                <Grid item xs={12} className="racetrackcreate__form__field">
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
