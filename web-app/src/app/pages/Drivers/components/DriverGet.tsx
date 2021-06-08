import './styles/DriverGet.scss';

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

import { DriverItem } from './DriverItem';

const DRIVER_QUERY = loader('../../../../gql/query/GetDriver.gql');

export function DriverGet() {
  const [driverId, setDriverId] = useState<number | null>(null);
  const { loading, data, error } = useQuery(DRIVER_QUERY, {
    skip: driverId === null ? true : false,
    variables: { id: driverId },
  });
  const handleSubmit = values => {
    const id = values.id;

    if (!isNaN(id)) {
      setDriverId(null);
      setDriverId(parseInt(values.id, 10));
    }
  };

  return (
    <Paper elevation={5} className="driverget">
      <h1 className="driverget__headline">Drivers-Get</h1>
      {loading ? (
        <CircularProgress className="driverget__loading" />
      ) : error !== undefined ? (
        <h1 className="driverget__error">Error fetching driver...</h1>
      ) : data !== undefined && data.driver === null && driverId !== null ? (
        <h1 className="driverget__error">Not Found</h1>
      ) : (
        data !== undefined &&
        data.driver(
          <div>
            <DriverItem driver={data.driver} />
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
              <Grid container spacing={3} className="driverget__form">
                <Grid item xs={12} className="driverget__form__field">
                  <Field as={TextField} name="id" label="Id" required />
                </Grid>
                <Grid item xs={12} className="driverget__form__field">
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
