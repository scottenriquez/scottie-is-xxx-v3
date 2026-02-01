import React, { Component } from 'react';
import BarChart from '../../Shared/d3/barChart';
import BarChartWithConditionalColors from '../../Shared/d3/barChartWithConditionalColors';

class WeeklyWinsBarGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.weeklyWinsData,
    };
  }

  render() {
    return (
      <div>
        <BarChartWithConditionalColors data={this.state.data} xAxisName={'week'} yAxisName={'wins'} />
      </div>
    );
  }
}

export default WeeklyWinsBarGraph;
