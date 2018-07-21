import React from 'react'
import styles from './styles.module.css'
import SubTitle from '../SubTitle';
import ArrowForward from '../../assets/images/ArrowForward.svg'
import Warning from '../../assets/images/Warning.svg'
import ErrorOutline from '../../assets/images/ErrorOutline.svg'
import Divider from '../Divider';

const NotificationDrawer = ({ show, onClose }) => {
  const arrayClasses = [styles.Wrapper]
  arrayClasses.push(show ? styles.Open : styles.Close)
  return (
    <div className={arrayClasses.join(' ')}>
      <div className={styles.ArrowForwardBlock}>
        <img src={ArrowForward} alt="arrow forward icon" onClick={onClose} />
      </div>
      <SubTitle>Notifications</SubTitle>
      <Divider />
      <div className={styles.Item}>
        <div className={styles.ItemIconBlock}>
          <img src={Warning} alt="warning icon" />
        </div>
        <div className={styles.ItemDescriptionBlock}>
          <p>
            Lost signal to #B13-23/K at
            4:23:37 a.m.
            Last location: 49.2583174,6.7005345
          </p>
        </div>
      </div>
      <Divider />
      <div className={styles.Item}>
        <div className={styles.ItemIconBlock}>
          <img src={ErrorOutline} alt="error outline icon" />
        </div>
        <div className={styles.ItemDescriptionBlock}>
          <p>
            Congratulations!
            Your pickup time reduced 17%.
            Trucks reduced fuel usage by 2%.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotificationDrawer