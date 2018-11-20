import React from 'react';
import PropTypes from 'prop-types';
import ErrorContainer from './ErrorContainer';
import styles from './TextError.scss';

class TextError extends React.Component{

    render(){
        const { text, width } = this.props;

        return(
            <ErrorContainer>
                <h1 width={width} className={styles.textError}>{text}</h1>
            </ErrorContainer>
        )
    }
}

TextError.defaultProps = {
    width: '60%',
    text: 'Sorry something went wrong'
}

export default TextError;