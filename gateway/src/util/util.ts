import { ApolloError } from 'apollo-server-express';
import Axios from 'axios';
import nodeConfig from 'config';
import http from 'http';

import { Config } from '../interfaces/Config';

export const getServiceUrlFor = async (
  serviceName: string
): Promise<string | undefined> => {
  const config = (nodeConfig as unknown) as Config;
  const routeMap = config.routeMap;
  const match = Object.keys(routeMap).find(service =>
    serviceName.match(service)
  );
  if (match) {
    return routeMap[match];
  } else {
    console.error(`No path mapping found for ${serviceName}`);
  }
};

export function defaultErrorHandling(error: any) {
  const err = error?.response?.data?.status;
  if (err) {
    throw new ApolloError(
      err.message,
      http.STATUS_CODES[err.status] || err.status,
      { status: err.status }
    );
  }
}

export async function defaultAxiosWrapper(
  serviceName: string,
  hostHeaders = {}
) {
  const baseURL = await getServiceUrlFor(serviceName);
  console.log(`Found url ${baseURL} for service ${serviceName}`);
  const client = Axios.create({
    baseURL,
    headers: {
      ...hostHeaders
    }
    // withCredentials: true
  });

  client.interceptors.request.use(async config => {
    try {
      const baseURL = await getServiceUrlFor(serviceName);
      if (baseURL) config.baseURL = baseURL;
    } catch {
    } finally {
      return config;
    }
  });

  client.interceptors.response.use(res => {
    return res?.data !== null ? res?.data : res;
  }, defaultErrorHandling);

  return client;
}
