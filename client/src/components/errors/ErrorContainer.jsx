import React from 'react';
import styles from './ErrorContainer.scss';

export default function ErrorContainer(props){

    return(    
        <div className={styles.errorContainer}>
            {props.children}
        </div>
    )
}