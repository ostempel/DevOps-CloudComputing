import { AxiosInstance } from 'axios';

export interface Context {
  connections: {
    [service in Services]: AxiosInstance;
  };
}

export type Services = 'carsService' | 'driversService' | 'racetracksService';
