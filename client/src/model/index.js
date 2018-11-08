import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createSelector } from 'reselect';

import projects from './projects';
import sites from './sites';
import map from './map';
import trees from './trees';

const reducers = combineReducers({
  projects,
  sites,
  map,
  trees
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
const allTrees = state => state.trees;

export const getProjects = createSelector(
  [allProjects],
  projects => projects.ids.map(id => projects.byId[id])
);

export const getSites = createSelector(
  [allSites],
  sites => sites.ids.map(id => sites.byId[id])
);

export const getTrees = createSelector(
  [allTrees],
  trees => trees.ids.map(id => trees.byId[id])
);

export const getProjectSites = createSelector(
  (state, props) => props.item,
  getSites,
  (project, sites) => sites.filter(s => project.sites.includes(s.id))
);

export const getSiteTrees = createSelector(
  state => state.sites.byId[state.sites.selected].trees,
  getTrees,
  (siteTrees, trees) => trees.filter(t => siteTrees.includes(t.id))
);