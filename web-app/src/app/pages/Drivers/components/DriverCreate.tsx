import './styles/DriverCreate.scss';

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

const DRIVER_CREATE = loader('../../../../gql/mutation/CreateDriver.gql');

export function DriverCreate() {
  const [addDriver, { data, error, loading }] = useMutation(DRIVER_CREATE);

  const handleSubmitClick = async values => {
    let saveBody = values;
    await addDriver({
      variables: { data: { ...saveBody } },
      refetchQueries: ['GetDrivers'],
    }).catch(err => {});
  };

  return (
    <Paper elevation={5} className="drivercreate">
      <h1 className="drivercreate__headline">Driver-Create</h1>
      {loading ? (
        <CircularProgress className="drivercreate__loading" />
      ) : error !== undefined ? (
        <div>
          <h1 className="drivercreate__error">Error creating driver...</h1>
        </div>
      ) : (
        data !== undefined && (
          <div>
            <DriverItem driver={data.createDriver} />
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
              <Grid container spacing={3} className="drivercreate__form">
                <Grid item xs={12} className="drivercreate__form__field">
                  <Field
                    as={TextField}
                    name="firstName"
                    label="First Name"
                    required
                  />
                </Grid>
                <Grid item xs={12} className="drivercreate__form__field">
                  <Field
                    as={TextField}
                    name="lastName"
                    label="Last Name"
                    required
                  />
                </Grid>
                <Grid item xs={12} className="drivercreate__form__field">
                  <Field
                    as={TextField}
                    name="birthDate"
                    label="Birth Date"
                    required
                  />
                </Grid>
                <Grid item xs={12} className="drivercreate__form__field">
                  <Field
                    as={TextField}
                    name="country"
                    label="Country"
                    required
                  />
                </Grid>
                <Grid item xs={12} className="drivercreate__form__field">
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
