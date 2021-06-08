import './styles/DriversList.scss';

import { loader } from 'graphql.macro';
import React from 'react';

import { useQuery } from '@apollo/client';
import { CircularProgress, Paper } from '@material-ui/core';

import { DriverItem } from './DriverItem';

const DRIVERS_QUERY = loader('../../../../gql/query/GetDrivers.gql');

export function DriversList() {
  const { loading, data, error } = useQuery(DRIVERS_QUERY);

  const list = () => {
    return (
      <>
        {data.drivers.map(driver => {
          return <DriverItem driver={driver} />;
        })}
      </>
    );
  };

  return (
    <Paper elevation={5} className="driverslist">
      <h1 className="driverslist__headline">Drivers-List</h1>
      {loading ? (
        <CircularProgress className="driverslist__loading" />
      ) : error !== undefined ? (
        <h1 className="driverslist__error">Error fetching drivers...</h1>
      ) : data.drivers === null || data.drivers.length === 0 ? (
        <h1 className="driverslist__empty">Empty</h1>
      ) : (
        <div>{list()}</div>
      )}
    </Paper>
  );
}
