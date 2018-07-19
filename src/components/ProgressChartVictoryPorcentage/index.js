import React from 'react'
import BoxBackground from '../BoxBackground'
import { VictoryPie } from 'victory'
import styles from './styles.module.css'
import colors from '../../shared/colorPalette'

const ProgressChartVictoryPorcentage = ({ data }) => {
  return (
    <BoxBackground>
      <div className={styles.Wrapper}>
        <div className={styles.Paragraph}>
          <span>
            {data}%
          </span>
        </div>
        <VictoryPie
          padAngle={0}
          labelComponent={<span />}
          innerRadius={70}
          width={200} height={200}
          data={[{ 'key': "", 'y': data }, { 'key': "", 'y': (100 - data) }]}
          colorScale={[colors.orange.main, colors.grey.light]}
        />
      </div>
    </BoxBackground>
  )
}


export default ProgressChartVictoryPorcentage