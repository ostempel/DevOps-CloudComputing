import './styles/CarGet.scss';

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

import { CarItem } from './CarItem';

const CAR_QUERY = loader('../../../../gql/query/GetCar.gql');

export function CarGet() {
  const [carId, setCarId] = useState<number | null>(null);
  const { loading, data, error } = useQuery(CAR_QUERY, {
    skip: carId === null ? true : false,
    variables: { id: carId },
    fetchPolicy: 'no-cache',
  });

  const handleSubmit = values => {
    const id = values.id;

    if (!isNaN(id)) {
      setCarId(null);
      setCarId(parseInt(values.id, 10));
    }
  };

  return (
    <Paper elevation={5} className="carget">
      <h1 className="carget__headline">Cars-Get</h1>
      {loading ? (
        <CircularProgress className="carget__loading" />
      ) : error !== undefined ? (
        <h1 className="carget__error">Error fetching car...</h1>
      ) : data !== undefined && data.car === null && carId !== null ? (
        <h1 className="carget__error">Not Found</h1>
      ) : (
        data !== undefined && (
          <div>
            <CarItem car={data.car} />
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
              <Grid container spacing={3} className="carget__form">
                <Grid item xs={12} className="carget__form__field">
                  <Field as={TextField} name="id" label="Id" required />
                </Grid>
                <Grid item xs={12} className="carget__form__field">
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
