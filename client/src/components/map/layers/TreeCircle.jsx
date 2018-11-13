import React from 'react';
import { Layer } from '../Layer';
import MapContext from '../context';

export default class TreeCircle extends React.Component {

    getGradientRangeColor = (height) => {
        return {
          "circle-color": [
            "interpolate-hcl",
            ['linear'],
            height,
            0, '#FFFFFF',
            70, '#5A8442'
          ],
        }
    }

    render(){
        const { tree } = this.props;

        return (
            <MapContext.Consumer>
                { context => 
                    <Layer 
                        id={tree.id.toString()} 
                        type="circle" 
                        paint={this.getGradientRangeColor(tree.height)} 
                        source={tree.id.toString()} 
                        map={context.map}
                    /> 
                }
            </MapContext.Consumer>
        )
    }
}