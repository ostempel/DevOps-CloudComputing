import './styles/CarsList.scss';

import { loader } from 'graphql.macro';
import React from 'react';

import { useQuery } from '@apollo/client';
import { CircularProgress, Paper } from '@material-ui/core';

import { CarItem } from './CarItem';

const CARS_QUERY = loader('../../../../gql/query/GetCars.gql');

export function CarsList() {
  const { loading, data, error } = useQuery(CARS_QUERY);

  const list = () => {
    return (
      <>
        {data.cars.map(car => {
          return <CarItem car={car} />;
        })}
      </>
    );
  };

  return (
    <Paper elevation={5} className="carslist">
      <h1 className="carslist__headline">Cars-List</h1>
      {loading ? (
        <CircularProgress className="carslist__loading" />
      ) : error !== undefined ? (
        <h1 className="carslist__error">Error fetching cars...</h1>
      ) : data.cars === null || data.cars.length === 0 ? (
        <h1 className="carslist__empty">Empty</h1>
      ) : (
        <div>{list()}</div>
      )}
    </Paper>
  );
}
