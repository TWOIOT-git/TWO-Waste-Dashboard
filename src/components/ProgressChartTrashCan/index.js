import React from 'react'
import BoxBackground from '../BoxBackground'
import { VictoryPie } from 'victory'
import styles from './styles.module.css'
import colors from '../../shared/colorPalette'
import SubTitle from '../SubTitle';

import trash_can_img from '../../assets/images/trash_can.svg'



const ProgressChartTrashCan = ({ data, location, id, style }) => {

    var status_color = (data) => {
      if (data <= 49) {
        return colors.green.main
      }  else if (data <= 79) {
        return colors.orange.main
      } else {
        return colors.red.main
      }
    }

    return (
        <BoxBackground wrapperProps={{ style: { height: '100%', ...(style ? style : null) } }}>
            <div className={styles.BoxWrapper}>
              <div className={styles.TrashCanWrapper} >
                <img src={trash_can_img} alt="twoiot trashcan" />

                <div className={styles.Wrapper}>
                    <div className={styles.Paragraph}>
                        <span>
                            {Math.round(data)}%
                        </span>
                    </div>
                    <VictoryPie
                        padAngle={0}
                        labels={() => null}
                        innerRadius={70}
                        width={200} height={200}
                        data={[{ 'key': "", 'y': data }, { 'key': "", 'y': (100 - data) }]}
                        colorScale={[status_color(data), colors.grey.light]}
                    />
                </div>
              </div>
              <div className={styles.ParagraphBlock}>
                  <SubTitle>{id}</SubTitle>
                  <p>{location}</p>
              </div>

            </div>
        </BoxBackground>
    )
}


export default ProgressChartTrashCan
