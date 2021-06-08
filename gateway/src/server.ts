import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import nodeConfig from 'config';
import cors from 'cors';
import express from 'express';

import { Config } from './interfaces/Config';
import schema from './schema';
import { defaultAxiosWrapper } from './util/util';

const config = (nodeConfig as unknown) as Config;

export const app = express();

(async () => {
  const connections = {
    carsService: await defaultAxiosWrapper('carsService'),
    driversService: await defaultAxiosWrapper('driversService'),
    racetracksService: await defaultAxiosWrapper('racetracksService')
  };

  const appolloConfig: ApolloServerExpressConfig = {
    schema,
    context: { connections }
  };

  const server = new ApolloServer(appolloConfig);

  app.use(cors());
  app.use(compression());
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
  app.use(bodyParser.json({ limit: '20mb' }));
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen({ port: config.application.port }, () => {
    console.error(
      `GraphQL is now running on http://localhost:${config.application.port}${server.graphqlPath}`
    );
  });
})();
