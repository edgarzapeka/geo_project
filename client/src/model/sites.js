import axios from 'axios';

export const FETCH_SITES_REQUESTED = 'FETCH_SITES_REQUESTED';
export const FETCH_SITES_COMPLETED = 'FETCH_SITES_COMPLETED';
export const FETCH_SITES_ERROR = 'FETCH_SITES_ERROR';

export const SITES_SET_CURRENT = 'SITES_SET_CURRENT';

function fetchSitesRequested() {
  return {
    type: FETCH_SITES_REQUESTED
  };
}

function fetchSitesCompleted(sites) {
  return {
    type: FETCH_SITES_COMPLETED,
    sites
  };
}

function fetchSitesError(error) {
  return {
    type: FETCH_SITES_ERROR,
    error
  };
}

export function fetchSites() {
  return dispatch => {
    dispatch(fetchSitesRequested());

    axios
    .get('/api/sites')
    .then((response) => {
      dispatch(fetchSitesCompleted(response.data));
    })
    .catch(error => {
      dispatch(fetchSitesError(error));
    });
  }
}

export function sitesSetCurrent(id) {
  return {
    type: SITES_SET_CURRENT,
    id
  };
}

const initial = {
  status: null,
  error: null,
  selected: null,
  byId: {},
  ids: []
};

const reducer = {
  [FETCH_SITES_REQUESTED](state, action) {
    return {
      ...state,
      status: FETCH_SITES_REQUESTED
    };
  },
  [FETCH_SITES_COMPLETED](state, action) {
    return {
      ...state,
      status: FETCH_SITES_COMPLETED,
      error: null,
      selected: action.sites.ids.length > 0 ? action.sites.ids[0] : null,
      ...action.sites
    };
  },
  [FETCH_SITES_ERROR](state, action) {
    return {
      ...state,
      status: FETCH_SITES_ERROR,
      error: action.error
    };
  },
  [SITES_SET_CURRENT](state, action) {
    return {
      ...state,
      selected: action.id
    };
  }
};

export default (state = initial, action) => reducer.hasOwnProperty(action.type) ? reducer[action.type](state, action) : state;
