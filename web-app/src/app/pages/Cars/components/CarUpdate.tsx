import './styles/CarUpdate.scss';

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
import { omit, omitBy } from 'lodash';

const CAR_UPDATE = loader('../../../../gql/mutation/UpdateCar.gql');

export function CarUpdate() {
  const [updateCar, { data, error, loading }] = useMutation(CAR_UPDATE);

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
    await updateCar({
      variables: {
        id: values.id,
        data: omitBy(saveBody, v => v === null || v === ''),
      },
      refetchQueries: ['GetCars'],
    }).catch(err => {});
  };

  return (
    <Paper elevation={5} className="carupdate">
      <h1 className="carupdate__headline">Car-Update</h1>
      {loading ? (
        <CircularProgress className="carupdate__loading" />
      ) : error !== undefined ? (
        <h1 className="carupdate__error">Error updating car...</h1>
      ) : data !== undefined && data.updateCar === null ? (
        <h1 className="cardelete__error">Not Found</h1>
      ) : (
        data !== undefined && (
          <div>
            <CarItem car={data.updateCar} />
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
              <Grid container spacing={3} className="carupdate__form">
                <Grid item xs={12} className="carupdate__form__field">
                  <Field as={TextField} name="id" label="ID" required />
                </Grid>
                <Grid item xs={12} className="carupdate__form__field">
                  <Field as={TextField} name="brand" label="Brand" />
                </Grid>
                <Grid item xs={12} className="carupdate__form__field">
                  <Field as={TextField} name="model" label="Model" />
                </Grid>
                <Grid item xs={12} className="carupdate__form__field">
                  <Field
                    as={TextField}
                    name="manufactureYear"
                    label="Manufacture Year"
                  />
                </Grid>
                <Grid item xs={12} className="carupdate__form__field">
                  <Field as={TextField} name="ps" label="PS" />
                </Grid>
                <Grid item xs={12} className="carupdate__form__field">
                  <Field as={TextField} name="topSpeed" label="Top Speed" />
                </Grid>
                <Grid item xs={12} className="carupdate__form__field">
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
