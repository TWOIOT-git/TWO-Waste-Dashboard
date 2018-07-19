import React from 'react'
import styles from './styles.module.css'
import SubTitle from '../SubTitle';
import Warning from '@material-ui/icons/Warning';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { Divider } from '@material-ui/core';

const NotificationDrawer = ({ show, onClose }) => {
  const arrayClasses = [styles.Wrapper]
  arrayClasses.push(show ? styles.Open : styles.Close)
  return (
    <div className={arrayClasses.join(' ')}>
      <div className={styles.ArrowForwardBlock}>
        <ArrowForward onClick={onClose} />
      </div>
      <SubTitle>Notifications</SubTitle>
      <Divider className={styles.Divider} />
      <div className={styles.Item}>
        <div className={styles.ItemIconBlock}>
          <Warning />
        </div>
        <div className={styles.ItemDescriptionBlock}>
          <p>
            Lost signal to #B13-23/K at
            4:23:37 a.m.
            Last location: 49.2583174,6.7005345
          </p>
        </div>
      </div>
      <Divider className={styles.Divider} />
      <div className={styles.Item}>
        <div className={styles.ItemIconBlock}>
          <ErrorOutline />
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