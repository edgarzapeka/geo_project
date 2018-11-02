import React from 'react';

import styles from './Layout.scss';

export default function Layout(props) {
  return (
    <div className={ styles.container }>
      <div className={ styles.sidebar }>
        { props.sidebar }
      </div>
      <div className={ styles.top }>
        { props.top }
      </div>
      <div className={ styles.bottom }>
        { props.bottom }
      </div>
    </div>
  );
}

