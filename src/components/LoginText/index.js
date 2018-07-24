import React from 'react'
import styles from './styles.module.css'

const LoginText = ({ quote, author, loading }) => {
  if (loading) {
    return (
      <div className={styles.Wrapper}>
        <h1 className={styles.Paragraph}>
          Loading...
        </h1>
      </div>
    )
  } else {
    return (
      <div className={styles.Wrapper}>
        <h1 className={styles.Paragraph}>
          {quote ? quote : <span>TAC TICS WITHOUT <br /> STRATEGY, IS THE<br />NOISE BEFORE DEFEAT</span>}
        </h1>
        <h2 className={styles.ParagraphSmall}>
          {author ? author : <span>Sun Tzu,<br />The Art of War</span>}
        </h2>
      </div>
    )
  }
}

export default LoginText