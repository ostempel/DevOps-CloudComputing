import * as Root from './root.graphql';
import Cars from './cars';
import Drivers from './drivers';
import Racetracks from './racetracks';

export default [Root, ...Cars, ...Drivers, ...Racetracks];
