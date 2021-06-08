import React from 'react';

import { Grid, Link } from '@material-ui/core';

interface Props {
  url: string;
  title: string;
  icon: JSX.Element;
}
export function ServiceLink({ url, title, icon }: Props) {
  return (
    <Grid container style={{ padding: '0.5em' }}>
      <Grid item xs={2} className="homePage__paper__content__servicelink__icon">
        {icon}
      </Grid>
      <Grid item xs={10}>
        <Link href={url}>{title}</Link>
      </Grid>
    </Grid>
  );
}
