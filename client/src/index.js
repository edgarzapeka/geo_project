import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';

import store from './model/';

import ProjectsIndex from './containers/ProjectsIndex';

import '../styles/app.scss';

render(
  <Provider store={store}>
    <ProjectsIndex />
  </Provider>
, document.getElementById('application'));
