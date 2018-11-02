import React, { Component } from 'react';

import MapContext from '../context';

class GeoJSON extends Component {
  removeSource(id) {
    const { map } = this.props;
    const source = map.getSource(id);

    if(source) {
      const order = map.getStyle().layers;
      const layers = order.map((layer, index) => {
        return { ...layer, before: (order[index + 1] && order[index + 1].id) || undefined }
      }).filter(layer => layer.source === source.id);
      
      layers.forEach(layer => {
        if(map.getLayer(layer.id)) {
          map.removeLayer(layer.id);
        }
      });

      map.removeSource(source.id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { map, data, id } = this.props;

    if(map) {
      if(map.getSource(id)) {
        this.removeSource(id);
      }
      
      map.addSource(id, { type: 'geojson', data });
    }
  }

  componentWillUnmount() {
    this.props.map.removeSource(this.props.id);
  }
  
  render() {
    return null;
  } 
}

export default props => (
  <MapContext.Consumer>
    { context => <GeoJSON { ...props } { ...context } /> }
  </MapContext.Consumer>
);
