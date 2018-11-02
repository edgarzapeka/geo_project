import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createSelector } from 'reselect';

import projects from './projects';
import sites from './sites';
import map from './map';

const reducers = combineReducers({
  projects,
  sites,
  map
});

const middleware = [
  store => next => action => typeof action === 'function' ? action(store.dispatch, store.getState) : next(action)
];

export default createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(
      ...middleware
    )
  )
);

const allProjects = state => state.projects;
const allSites = state => state.sites;

export const getProjects = createSelector(
  [allProjects],
  projects => projects.ids.map(id => projects.byId[id])
);

export const getSites = createSelector(
  [allSites],
  sites => sites.ids.map(id => sites.byId[id])
);
  