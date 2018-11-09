import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GradientDarkgreenGreen } from '@vx/gradient';
import { scaleLinear, scaleBand } from '@vx/scale';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';

import { getSiteTrees } from '../model';
import { classifyTreesByHight, getMaxNumberOfTreesPerCluster, CHART_MARGIN} from '../helpers/chartHelper';

class Chart extends Component {
  state = {
    width: 0,
    height: 0,
  };

  componentDidMount() {
    window.addEventListener('resize', this.setSize);
    
    this.setSize();
  }

  setSize = (event) => {
    const { width, height } = this.chart.getBoundingClientRect();

    this.setState((prevState) => {
      return {
        width,
        height
      };
    });
  }

  setRef = (node) => {
    this.chart = node;
  }

  render() {
    const { width, height } = this.state;
    const { trees } = this.props;

    const x = d => d.map(( value, index ) => (index + 1) * 10);

    const classifyedTrees = Object.values(classifyTreesByHight(trees));

    const xScale = scaleBand({
      rangeRound:[0, width - CHART_MARGIN.left - CHART_MARGIN.right],
      domain: x(classifyedTrees),
      padding: 0.2
    })

    const yScale = scaleLinear({
        rangeRound: [0, height - CHART_MARGIN.bottom - CHART_MARGIN.top],
        domain: [
          getMaxNumberOfTreesPerCluster(Object.values(classifyTreesByHight(trees))),
          0
        ]
    })
    
    /* This is a hack to first set the size based on percentage
       then query for the size so the chart can be scaled to the window size.
       The second render is caused by componentDidMount(). */
    if(width < 100 || height < 100) {
      return <svg ref={ this.setRef } width={'100%'} height={'100%'}></svg>
    }

    return (
      <svg ref={ this.setRef } width={width} height={height}>
        <GradientDarkgreenGreen id="gradient" />
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={`url(#gradient)`}
        />

        <Group left={CHART_MARGIN.left} top={CHART_MARGIN.top}>
          {classifyedTrees.map((d, i) => {
          const barHeight = height - yScale(d.length);
          return (
            <Group key={`bar-${i}`}>
              <Bar
                width={xScale.bandwidth()}
                height={barHeight - CHART_MARGIN.bottom - CHART_MARGIN.top}
                x={xScale((i + 1) * 10)}
                y={yScale(d.length)}
                fill="rgba(23, 233, 217, .5)"
              />
            </Group>
          );
          })}
          <AxisLeft
            scale={yScale}
            hideAxisLine={true}
            hideTicks={true}
            tickLabelProps={(val, i) => ({
              textAnchor: 'end', 
              fontFamily: 'Helvetica', 
              fontSize: 12,
              fontWeight: 'bold',
              fill: 'white' })}
          />
          <AxisBottom
            scale={xScale}
            top={height - CHART_MARGIN.bottom - CHART_MARGIN.top}
            numTicks={7}
            hideTicks={true}
            hideAxisLine={true}
            tickFormat={(val, i) => `${val - 10}m - ${val}m`}
            tickLabelProps={(val, i) => ({
              textAnchor: 'middle', 
              fontFamily: 'Helvetica', 
              fontSize: 12,
              fontWeight: 'bold',
              fill: 'white' })}
          />
        </Group>
      </svg>
    );
  }
}

const mapStateToProps = (state) => ({
  trees: getSiteTrees(state, state)
});

export default connect(mapStateToProps)(Chart);
