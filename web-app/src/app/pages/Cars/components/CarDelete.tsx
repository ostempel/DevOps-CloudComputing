import './styles/CarDelete.scss';

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

const CAR_DELETE = loader('../../../../gql/mutation/DeleteCar.gql');

export function CarDelete() {
  const [deleteCar, { data, error, loading }] = useMutation(CAR_DELETE);

  const handleSubmit = async values => {
    if (values.id && !isNaN(values.id)) {
      values.id = parseInt(values.id, 10);
    }
    await deleteCar({
      variables: {
        id: values.id,
      },
      refetchQueries: ['GetCars'],
    }).catch(err => {});
  };

  return (
    <Paper elevation={5} className="cardelete">
      <h1 className="cardelete__headline">Car-Delete</h1>
      {loading ? (
        <CircularProgress className="cardelete__loading" />
      ) : error !== undefined ? (
        <h1 className="cardelete__error">Error deleting car...</h1>
      ) : data !== undefined && data.deleteCar === null ? (
        <h1 className="cardelete__error">Not Found</h1>
      ) : (
        data !== undefined &&
        data.deleteCar !== null && (
          <div>
            <CarItem car={data.deleteCar} />
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
              <Grid container spacing={3} className="cardelete__form">
                <Grid item xs={12} className="cardelete__form__field">
                  <Field as={TextField} name="id" label="ID" required />
                </Grid>
                <Grid item xs={12} className="cardelete__form__field">
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
