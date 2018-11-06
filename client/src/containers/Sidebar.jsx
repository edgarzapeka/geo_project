import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProjects, getSites } from '../model';

import { centerMapOnSite } from '../model/map';

import List from '../components/List';

class Sidebar extends Component {
  render() {
    const { projects } = this.props;

    return (
      <>
        { projects.map(p => <List item={p} key={p.id}/>) }
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    projects: getProjects(state),
    sites: getSites(state)
  };
}

const mapDispatchToProps = {
  centerMapOnSite
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
