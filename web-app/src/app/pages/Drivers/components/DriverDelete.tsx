import './styles/DriverDelete.scss';

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
import { DriverItem } from './DriverItem';

const DRIVER_DELETE = loader('../../../../gql/mutation/DeleteDriver.gql');

export function DriverDelete() {
  const [deleteDriver, { data, error, loading }] = useMutation(DRIVER_DELETE);

  const handleSubmit = async values => {
    if (values.id && !isNaN(values.id)) {
      values.id = parseInt(values.id, 10);
    }
    await deleteDriver({
      variables: {
        id: values.id,
      },
      refetchQueries: ['GetDrivers'],
    }).catch(err => {});
  };

  return (
    <Paper elevation={5} className="driverdelete">
      <h1 className="driverdelete__headline">Driver-Delete</h1>
      {loading ? (
        <CircularProgress className="driverdelete__loading" />
      ) : error !== undefined ? (
        <h1 className="driverdelete__error">Error deleting driver...</h1>
      ) : data !== undefined && data.deleteDriver === null ? (
        <h1 className="driverdelete__error">Not Found</h1>
      ) : (
        data !== undefined &&
        data.deleteDriver !== null && (
          <div>
            <DriverItem driver={data.deleteDriver} />
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
              <Grid container spacing={3} className="driverdelete__form">
                <Grid item xs={12} className="driverdelete__form__field">
                  <Field as={TextField} name="id" label="ID" required />
                </Grid>
                <Grid item xs={12} className="driverdelete__form__field">
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
