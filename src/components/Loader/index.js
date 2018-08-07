import React from 'react'
import styles from './styles.module.css'
import { ClipLoader } from 'react-spinners';
import FadeIn from '../FadeIn';

export default () => {
  return (
    <div className={styles.Loader}>
      <FadeIn>
        <ClipLoader
          color={'#FF6B00'}
          loading={true}
          size={100}
        />
      </FadeIn>
    </div>
  )
}
