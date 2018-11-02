import React, { Component } from 'react';

import MapContext from './context';

export class Layer extends Component {
  componentDidUpdate(previous) {
    const { id, map, type, paint, source } = this.props;

    if(map) {
      if(map.getLayer(id)) {
        map.removeLayer(id);
      }

      if(!map.getSource(source)) {
        console.error(`Adding a layer with a source that doesn't exist. Make sure sources come before layers.`);
      }

      map.addLayer({
        id,
        type,
        source,
        paint
      });
    }
  }

  componentWillUnmount() {
    this.props.map.removeLayer(this.props.id);
  }

  render() {
    return null;
  }
}

export default props => (
  <MapContext.Consumer>
    { context => <Layer { ...props } { ...context } /> }
  </MapContext.Consumer>
);
