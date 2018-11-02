import axios from 'axios';

export const FETCH_PROJECTS_REQUESTED = 'FETCH_PROJECTS_REQUESTED';
export const FETCH_PROJECTS_COMPLETED = 'FETCH_PROJECTS_COMPLETED';
export const FETCH_PROJECTS_ERROR = 'FETCH_PROJECTS_ERROR';

function fetchProjectsRequested() {
  return {
    type: FETCH_PROJECTS_REQUESTED
  };
}

function fetchProjectsCompleted(projects) {
  return {
    type: FETCH_PROJECTS_COMPLETED,
    projects
  };
}

function fetchProjectsError(error) {
  return {
    type: FETCH_PROJECTS_ERROR,
    error
  };
}

export function fetchProjects() {
  return dispatch => {
    dispatch(fetchProjectsRequested());

    axios
    .get('/api/projects')
    .then((response) => {
      dispatch(fetchProjectsCompleted(response.data));
    })
    .catch(error => {
      dispatch(fetchProjectsError(error));
    });
  };
}

const initial = {
  status: null,
  error: null,
  byId: {},
  ids: []
};

const reducer = {
  [FETCH_PROJECTS_REQUESTED](state, action) {
    return {
      ...state,
      status: FETCH_PROJECTS_REQUESTED
    };
  },
  [FETCH_PROJECTS_COMPLETED](state, action) {
    return {
      ...state,
      status: FETCH_PROJECTS_COMPLETED,
      error: null,
      ...action.projects
    };
  },
  [FETCH_PROJECTS_ERROR](state, action) {
    return {
      ...state,
      status: FETCH_PROJECTS_ERROR,
      error: action.error
    };
  }
}

export default (state = initial, action) => reducer.hasOwnProperty(action.type) ? reducer[action.type](state, action) : state;
