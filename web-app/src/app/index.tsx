/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';

import { StylesProvider } from '@material-ui/core';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { Cars } from './pages/Cars';
import { HomePage } from './pages/HomePage/Loadable';
import { Drivers } from './pages/Drivers';
import { Racetracks } from './pages/Racetracks';

export function App() {
  const { i18n } = useTranslation();
  return (
    <StylesProvider injectFirst>
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - DevOps & CloudComputing"
          defaultTitle="DevOps & CloudComputing"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta
            name="description"
            content="A study project for DevOps & CloudComputing"
          />
        </Helmet>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/cars" component={Cars} />
          <Route exact path="/drivers" component={Drivers} />
          <Route exact path="/racetracks" component={Racetracks} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </BrowserRouter>
    </StylesProvider>
  );
}
