import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as turf from '@turf/turf';

import Map, { Layer, Sources, GeoJSON } from '../components/map';

import { centerMapOnSite, mapSetCenter, mapSetZoom } from '../model/map';
import { getSiteTrees } from '../model';

class InteractiveMap extends Component {

  getGradientRangeColor(height){
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

  render() {
    const { bounding } = this.props.currentSite;
    const trees = this.props.trees;
    
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
          { trees.map(t => <GeoJSON id={t.id.toString()} data={turf.point([t.long, t.lat])} key={t.id}/>) }
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
        <Layer
          id="transparent-layer"
          type="fill"
          paint={{
            'fill-color': '#FFFFFF',
            'fill-opacity': 0.2
          }}
          source="bounding-box" 
        />
        { trees.map(t => 
          <Layer 
            id={t.id.toString()} 
            type="circle" 
            paint={this.getGradientRangeColor(t.height)} 
            source={t.id.toString()} 
            key={t.id}/>
          )}
      </Map>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentSite: state.sites.byId[state.sites.selected],
    center: state.map.center,
    zoom: state.map.zoom,
    trees: getSiteTrees(state, state)
  };
}

const mapDispatchToProps = {
  centerMapOnSite,
  mapSetCenter,
  mapSetZoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveMap);
