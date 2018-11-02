import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import MapContext from './context';

import '../../../../node_modules/mapbox-gl/dist/mapbox-gl.css';

import styles from './Map.scss';

export default class Map extends Component {
  state = {
    map: null
  }

  constructor(props) {
    super(props);

    mapboxgl.accessToken = process.env.MAPBOX_PUBLIC_KEY;
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: this.props.center,
      zoom: this.props.zoom
    });

    map.on('style.load', (event) => {
      map.on('moveend', (event) => {
        this.props.mapSetCenter(map.getCenter().toArray());
      });

      map.on('zoomend', (event) => {
        this.props.mapSetZoom(map.getZoom());
      });

      this.setState((previous) => ({ map }));

      this.props.centerMapOnSite(this.props.currentSite.id);
    });
  }

  componentDidUpdate(previous) {
    if(!this.state.map) return;

    if(this.props.center[0] !== previous.center[0] || this.props.center[1] !== previous.center[1]) {
      this.state.map.setCenter(this.props.center);
    }

    if(this.props.zoom !== previous.zoom) {
      this.state.map.setZoom(this.props.zoom);
    }
  }

  componentWillUnmount() {
    this.state.map.remove();
  }

  setRef = node => {
    this.container = node;
  }

  render() {
    const { map } = this.state;
    return (
      <div ref={ this.setRef } className={ styles.map }>
        <MapContext.Provider value={{
          map,
          loaded: !!map
        }}>
          { this.props.children }
        </MapContext.Provider>
      </div>
    );
  }
}
