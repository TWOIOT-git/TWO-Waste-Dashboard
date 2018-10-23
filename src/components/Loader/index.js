import React from 'react'
import styles from './styles.module.css'
import { ClipLoader } from 'react-spinners';
import FadeIn from '../FadeIn';
import colors from '../../shared/colorPalette'

export default () => {
  return (
    <div className={styles.Loader}>
      <FadeIn>
        <ClipLoader
          color={colors.orange.main}
          loading={true}
          size={100}
        />
      </FadeIn>
    </div>
  )
}
