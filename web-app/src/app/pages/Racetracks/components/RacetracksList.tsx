import './styles/RacetracksList.scss';

import { loader } from 'graphql.macro';
import React from 'react';

import { useQuery } from '@apollo/client';
import { CircularProgress, Paper } from '@material-ui/core';

import { RacetrackItem } from './RacetrackItem';

const RACETRACKS_QUERY = loader('../../../../gql/query/GetRacetracks.gql');

export function RacetracksList() {
  const { loading, data, error } = useQuery(RACETRACKS_QUERY);

  const list = () => {
    return (
      <>
        {data.racetracks.map(racetrack => {
          return <RacetrackItem racetrack={racetrack} />;
        })}
      </>
    );
  };

  return (
    <Paper elevation={5} className="racetrackslist">
      <h1 className="racetrackslist__headline">Racetracks-List</h1>
      {loading ? (
        <CircularProgress className="racetrackslist__loading" />
      ) : error !== undefined ? (
        <h1 className="racetrackslist__error">Error fetching racetracks...</h1>
      ) : data.racetracks === null || data.racetracks.length === 0 ? (
        <h1 className="racetrackslist__empty">Empty</h1>
      ) : (
        <div>{list()}</div>
      )}
    </Paper>
  );
}
