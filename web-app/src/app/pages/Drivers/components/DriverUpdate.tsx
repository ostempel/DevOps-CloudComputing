import './styles/DriverUpdate.scss';

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
import { omit, omitBy } from 'lodash';

const DRIVER_UPDATE = loader('../../../../gql/mutation/UpdateDriver.gql');

export function DriverUpdate() {
  const [updateDriver, { data, error, loading }] = useMutation(DRIVER_UPDATE);

  const handleSubmit = async values => {
    let saveBody = { ...omit(values, ['id']) };
    if (values.id && !isNaN(values.id)) {
      values.id = parseInt(values.id, 10);
    }
    if (values.ps && !isNaN(values.ps)) {
      saveBody.ps = parseInt(saveBody.ps, 10);
    }
    if (values.topSpeed && !isNaN(values.topSpeed)) {
      saveBody.topSpeed = parseInt(saveBody.topSpeed, 10);
    }
    await updateDriver({
      variables: {
        id: values.id,
        data: omitBy(saveBody, v => v === null || v === ''),
      },
      refetchQueries: ['GetDrivers'],
    }).catch(err => {});
  };

  return (
    <Paper elevation={5} className="driverupdate">
      <h1 className="driverupdate__headline">Driver-Update</h1>
      {loading ? (
        <CircularProgress className="driverupdate__loading" />
      ) : error !== undefined ? (
        <h1 className="driverupdate__error">Error updating driver...</h1>
      ) : data !== undefined && data.updateDriver === null ? (
        <h1 className="driverdelete__error">Not Found</h1>
      ) : (
        data !== undefined && (
          <div>
            <DriverItem driver={data.updateDriver} />
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
              <Grid container spacing={3} className="driverupdate__form">
                <Grid item xs={12} className="driverupdate__form__field">
                  <Field as={TextField} name="id" label="ID" required />
                </Grid>
                <Grid item xs={12} className="drivercreate__form__field">
                  <Field as={TextField} name="firstName" label="First Name" />
                </Grid>
                <Grid item xs={12} className="drivercreate__form__field">
                  <Field as={TextField} name="lastName" label="Last Name" />
                </Grid>
                <Grid item xs={12} className="drivercreate__form__field">
                  <Field as={TextField} name="birthDate" label="Birth Date" />
                </Grid>
                <Grid item xs={12} className="drivercreate__form__field">
                  <Field as={TextField} name="country" label="Country" />
                </Grid>
                <Grid item xs={12} className="driverupdate__form__field">
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
