import React, { Component } from 'react';

import { getProjectSites } from '../model';

import styles from './List.scss';
import { connect } from 'react-redux';

class List extends Component {

  state = {
    showSites: false
  }

  render(){
    const { item, projectSites } = this.props;;
    const { showSites } = this.state;

    return (
      <ul>
        <li className={ `${styles.listItem} ${styles.projectName} `} onClick={() => this.setState((state, props) => ({ showSites: !state.showSites })) }>{ item.name }</li>
        { showSites && (
            projectSites.map(s => <li className={ styles.listItem } key={s.id}>{s.name}</li>)
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

export default connect(mapStateToProps)(List)