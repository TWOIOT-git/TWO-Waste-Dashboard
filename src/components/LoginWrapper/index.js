import React from 'react'
import styles from './styles.module.css'
import backgroundURL from '../../assets/images/login_wallpaper.jpeg'

const LoginWrapper = ({ children }) =>
  <div className={styles.Wrapper} style={{ backgroundImage: `url(${backgroundURL})` }}>
    {children}
  </div>


export default LoginWrapper