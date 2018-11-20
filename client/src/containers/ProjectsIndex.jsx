import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FETCH_PROJECTS_COMPLETED, fetchProjects } from '../model/projects';
import { FETCH_SITES_COMPLETED, fetchSites } from '../model/sites';
import { FETCH_TREES_COMPLETED, fetchTrees } from '../model/trees';

import Layout from '../layouts/Layout';
import Sidebar from './Sidebar';
import InteractiveMap from './InteractiveMap';
import Chart from './Chart';
import Loading from '../components/Loading';
import ErrorBoundary from '../components/ErrorBoundary';
import ImageError from './../components/errors/ImageError';
import TextError from '../components/errors/TextError';

class ProjectsIndex extends Component {
  componentDidMount() {
    this.props.fetchProjects();
    this.props.fetchSites();
    this.props.fetchTrees();
  }

  render() {
    if(this.props.loaded === false) {
      return <Loading />
    }

    return (
      <Layout
        sidebar={ 
          <ErrorBoundary render={() => (
            <ImageError source={'https://uploads-ssl.webflow.com/5b695a890a10953894828022/5b6b3488681f898542b16090_fybr%20logo%20horizontal_white.svg'}/>
          )}>
            <Sidebar />
          </ErrorBoundary> }
        top={ 
          <ErrorBoundary render={() => (
            <TextError text={'Sorry. The Interactive Map is not available'} />
          )}>
            <InteractiveMap />
          </ErrorBoundary>
         }
        bottom={ 
          <ErrorBoundary render={() => (
            <TextError />
          )}>
            <Chart />
          </ErrorBoundary>
        }
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    loaded: state.projects.status === FETCH_PROJECTS_COMPLETED &&
            state.sites.status === FETCH_SITES_COMPLETED &&
            state.trees.status === FETCH_TREES_COMPLETED &&
            state.sites.selected !== null
  };
}

const mapDispatchToProps = {
  fetchProjects,
  fetchSites,
  fetchTrees
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsIndex);
