import React, { Component, useState } from 'react';

import { getProjectSites } from '../model';
import { centerMapOnSite } from '../model/map';
import { sitesSetCurrent } from '../model/sites';

import styles from './List.scss';
import { connect } from 'react-redux';

const List = props => {
  const [showSites, setShowSites] = useState(false);
  const { item, projectSites } = props;

  function onSiteSelectedHandler(id) {
    props.centerMapOnSite(id);
  }

  return (
    <ul>
      <li className={ `${styles.listItem} ${styles.projectName} `} onClick={() => setShowSites(true)}><a href="#">{ item.name }</a></li>
      { showSites && (
          projectSites.map(s => <li className={ styles.listItem } key={s.id} onClick={() => onSiteSelectedHandler(s.id)}><a href="#">{s.name}</a></li>)
      ) }
    </ul>
  );

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