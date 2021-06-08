export interface Config {
  routeMap: RouteMap;
  application: {
    port: number;
  };
}

type RouteMap = { [path: string]: string };
