import React, { Component } from 'react'
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
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
        currency={`$ ${dataFromLabel['currency']}`}
        porcentage={dataFromLabel['porcentage']}
      />
    )
  }

  render() {
    return (
      <React.Fragment>
        <ResponsiveContainer
          width='100%'
          height={280}
          className="GrowthChart-ResponsiveContainer"
        >
          <AreaChart data={this.props.data}>
            <Tooltip
              offset={-40}
              cursor={{ stroke: lightenDarkenColor(colors.primary.main, 40), strokeWidth: 1 }}
              content={this.renderTooltip} />
            <defs>
              <linearGradient id="colorCurreny" x1="0" y1="0" x2="0" y2="2">
                <stop offset="1%" stopColor={lightenDarkenColor(colors.primary.main, 40)} stopOpacity={1} />
                <stop offset="99%" stopColor={lightenDarkenColor(colors.primary.main, -20)} stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="colorotherValue" x1="0" y1="0" x2="0" y2="2">
                <stop offset="1%" stopColor={lightenDarkenColor(colors.primary.main, 90)} stopOpacity={1} />
                <stop offset="99%" stopColor={lightenDarkenColor(colors.yellow.main, 60)} stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <Area type='monotone' dataKey='currency' stroke={colors.primary.main} strokeWidth="2" fill='url(#colorCurreny)' />
            <Area type='monotone' dataKey='otherValue' stroke={colors.primary.main} strokeWidth="2" fill='url(#colorotherValue)' />
          </AreaChart>
        </ResponsiveContainer>
      </React.Fragment>
    )
  }
}

export default GrowthChart