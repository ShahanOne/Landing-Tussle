import React from 'react'

import styles from './index.module.scss'

const HighlightTeak = ({ iconurl, text, className }) => (
  <div
    className={
      className ? `${styles.mainContainer} ${className}` : styles.mainContainer
    }>
    <img alt="icon" className={styles.icon} src={iconurl} />
    <p className={styles.text}>{text}</p>
  </div>
)

export default HighlightTeak
