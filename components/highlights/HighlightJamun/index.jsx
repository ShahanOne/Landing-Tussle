import React from 'react'

import styles from './index.module.scss'

const HighlightJamun = ({ iconurl, header, description, className }) => (
  <div
    className={
      className ? `${styles.mainContainer} ${className}` : styles.mainContainer
    }>
    <img alt="highlight icon" src={iconurl} className={styles.icon} />
    <div className={styles.textContainer}>
      <p className={styles.header}>{header}</p>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  </div>
)

export default HighlightJamun
