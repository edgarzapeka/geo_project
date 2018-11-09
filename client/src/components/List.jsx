import React, { Component } from 'react';

import { getProjectSites } from '../model';
import { centerMapOnSite } from '../model/map';
import { sitesSetCurrent } from '../model/sites';

import styles from './List.scss';
import { connect } from 'react-redux';

class List extends Component {

  state = {
    showSites: false
  }

  onSiteSelectedHandler = id => {
    this.props.centerMapOnSite(id);
    this.props.sitesSetCurrent(id);
  }

  render(){
    const { item, projectSites } = this.props;;
    const { showSites } = this.state;

    return (
      <ul>
        <li className={ `${styles.listItem} ${styles.projectName} `} onClick={() => this.setState((state, props) => ({ showSites: !state.showSites })) }><a href="#">{ item.name }</a></li>
        { showSites && (
            projectSites.map(s => <li className={ styles.listItem } key={s.id} onClick={() => this.onSiteSelectedHandler(s.id)}><a href="#">{s.name}</a></li>)
        ) }
      </ul>
    );
  }
}

const mapStateToProps = () => {
  return (state, ownProps) => {
    return {
      projectSites: getProjectSites(state, ownProps)
    }
  }
}

const mapDispatchToProps = {
  centerMapOnSite,
  sitesSetCurrent
}

export default connect(mapStateToProps, mapDispatchToProps)(List)