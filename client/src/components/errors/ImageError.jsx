import React from 'react';
import PropTypes from 'prop-types';
import ErrorContainer from './ErrorContainer';

class ImageError extends React.Component{

    render(){
        const { source, width, height } = this.props;
        console.log(source)

        return(
            <ErrorContainer>
                <img src={source} width={width} height={height} />
            </ErrorContainer>
        )
    }
}

ImageError.propTypes = {
    source: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
}

ImageError.defaultProps = {
    width: '60%',
}

export default ImageError;