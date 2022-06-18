import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './skeleton.module.css';

function skeleton() {
  return (
    <>
      <SkeletonTheme baseColor="#1B1C25" highlightColor="#51557E">
        <div>
          <Skeleton className={styles.navbar} height={70} />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.text}>
            <Skeleton />
          </div>
          <div className={styles.heading1}>
            <Skeleton height={40} />
          </div>
          <div className={styles.hero}>
            <Skeleton height={400} />
          </div>
          <div className={styles.lower}>
            <div className={styles.left}>
              <h2>
                <Skeleton />
              </h2>
              <h2>
                <Skeleton />
              </h2>
              <span>
                <Skeleton height={200} />
              </span>
              <h2>
                <Skeleton />
              </h2>
              <p>
                <Skeleton width="60%" />
              </p>
              <p>
                <Skeleton width="60%" />
              </p>
            </div>
            <div className={styles.left}>
              <h2>
                <Skeleton />
              </h2>
              <h2>
                <Skeleton />
              </h2>

              <h2>
                <Skeleton />
              </h2>
              <p>
                <Skeleton width="80%" height={250} />
              </p>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </>
  );
}

export default skeleton;
