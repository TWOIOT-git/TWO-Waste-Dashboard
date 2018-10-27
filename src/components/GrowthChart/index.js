import React, { Component } from 'react'
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis
} from 'recharts';
import CustomTooltip from '../ToolTip'
import colors from '../../shared/colorPalette'
import lightenDarkenColor from '../../shared/lightenDarkenColor'
import './styles.css'

class GrowthChart extends Component {
  renderTooltip = (tooltip) => {
    const label = tooltip.label
    const dataFromLabel = { ...this.props.data[label] }
    return (
      <CustomTooltip
        bin_level={dataFromLabel['bin_level']}
      />
    )
  }


  render() {
    return (
      <React.Fragment>
        <ResponsiveContainer
          width='100%'
          height={150}
          className="GrowthChart-ResponsiveContainer"
        >
          <AreaChart
          data={this.props.data}>
            <defs>
              <linearGradient id="colorCurreny" x1="0" y1="0" x2="0" y2="2">
                <stop offset="1%" stopColor={lightenDarkenColor(colors.primary.main, 40)} stopOpacity={1} />
                <stop offset="99%" stopColor={lightenDarkenColor(colors.primary.main, -20)} stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="colorotherValue" x1="0" y1="0" x2="0" y2="2">
                <stop offset="1%" stopColor={lightenDarkenColor(colors.primary.main, 90)} stopOpacity={1} />
                <stop offset="99%" stopColor={lightenDarkenColor(colors.orange.main, 60)} stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} dataKey="percentage" />
            <CartesianGrid vertical={false} />
            <Area type='monotone' dataKey='percentage' stroke={colors.orange.main} strokeWidth="2" fill='url(#colorCurreny)' />
          </AreaChart>
        </ResponsiveContainer>
      </React.Fragment>
    )
  }
}

export default GrowthChart
