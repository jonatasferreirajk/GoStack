import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
  return (
    <BrowserRouter>
      <switch>
        <Route path="/" exact component={Main} />
        <Route path="/repository" component={Repository} />
      </switch>
    </BrowserRouter>
  );
}
