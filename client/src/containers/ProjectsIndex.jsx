import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FETCH_PROJECTS_COMPLETED, fetchProjects } from '../model/projects';
import { FETCH_SITES_COMPLETED, fetchSites } from '../model/sites';

import Layout from '../layouts/Layout';
import Sidebar from './Sidebar';
import InteractiveMap from './InteractiveMap';
import Chart from './Chart';
import Loading from '../components/Loading';

class ProjectsIndex extends Component {
  componentDidMount() {
    this.props.fetchProjects();
    this.props.fetchSites();
  }

  render() {
    if(this.props.loaded === false) {
      return <Loading />
    }

    return (
      <Layout
        sidebar={ <Sidebar /> }
        top={ <InteractiveMap /> }
        bottom={ <Chart />}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    loaded: state.projects.status === FETCH_PROJECTS_COMPLETED &&
            state.sites.status === FETCH_SITES_COMPLETED &&
            state.sites.selected !== null
  };
}

const mapDispatchToProps = {
  fetchProjects,
  fetchSites
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsIndex);
