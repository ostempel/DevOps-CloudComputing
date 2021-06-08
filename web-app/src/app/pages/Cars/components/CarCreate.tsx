import './styles/CarCreate.scss';

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
import { CarItem } from './CarItem';

const CAR_CREATE = loader('../../../../gql/mutation/CreateCar.gql');

export function CarCreate() {
  const [addCar, { data, error, loading }] = useMutation(CAR_CREATE);

  const handleSubmitClick = async values => {
    let saveBody = values;
    if (!isNaN(values.ps)) {
      saveBody.ps = parseInt(saveBody.ps, 10);
    }
    if (!isNaN(values.topSpeed)) {
      saveBody.topSpeed = parseInt(saveBody.topSpeed, 10);
    }
    await addCar({
      variables: { data: { ...saveBody } },
      refetchQueries: ['GetCars'],
    }).catch(err => {});
  };

  return (
    <Paper elevation={5} className="carcreate">
      <h1 className="carcreate__headline">Car-Create</h1>
      {loading ? (
        <CircularProgress className="carcreate__loading" />
      ) : error !== undefined ? (
        <div>
          <h1 className="carcreate__error">Error creating car...</h1>
        </div>
      ) : (
        data !== undefined && (
          <div>
            <CarItem car={data.createCar} />
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
              <Grid container spacing={3} className="carcreate__form">
                <Grid item xs={12} className="carcreate__form__field">
                  <Field as={TextField} name="brand" label="Brand" required />
                </Grid>
                <Grid item xs={12} className="carcreate__form__field">
                  <Field as={TextField} name="model" label="Model" required />
                </Grid>
                <Grid item xs={12} className="carcreate__form__field">
                  <Field
                    as={TextField}
                    name="manufactureYear"
                    label="Manufacture Year"
                    required
                  />
                </Grid>
                <Grid item xs={12} className="carcreate__form__field">
                  <Field as={TextField} name="ps" label="PS" required />
                </Grid>
                <Grid item xs={12} className="carcreate__form__field">
                  <Field
                    as={TextField}
                    name="topSpeed"
                    label="Top Speed"
                    required
                  />
                </Grid>
                <Grid item xs={12} className="carcreate__form__field">
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
