import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as turf from '@turf/turf';

import Map, { Layer, Sources, GeoJSON } from '../components/map';

import { centerMapOnSite, mapSetCenter, mapSetZoom } from '../model/map';

class InteractiveMap extends Component {
  render() {
    const { bounding } = this.props.currentSite;
    
    const boundingFeature = turf.polygon([[
      [bounding.left, bounding.top],
      [bounding.right, bounding.top],
      [bounding.right, bounding.bottom],
      [bounding.left, bounding.bottom],
      [bounding.left, bounding.top]
    ]], { name: 'Bounding Area' });

    return (
      <Map { ...this.props }>
        <Sources>
          <GeoJSON id="bounding-box" data={ boundingFeature } />
        </Sources>
        <Layer
          id="bounding-box"
          type="line"
          paint={{
            'line-width': 2,
            'line-color': '#fff'
          }}
          source="bounding-box"
        />
      </Map>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentSite: state.sites.byId[state.sites.selected],
    center: state.map.center,
    zoom: state.map.zoom
  };
}

const mapDispatchToProps = {
  centerMapOnSite,
  mapSetCenter,
  mapSetZoom
};

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveMap);
