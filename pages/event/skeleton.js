import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './skeleton.module.css';

function skeleton() {
  return (
    <>
      <div>
        <Skeleton height={70} />
        <SkeletonTheme color="#5e6c77" highlightColor="#a9b7c1">
          <p>
            <Skeleton count={3} duration={2} />
          </p>
        </SkeletonTheme>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          <Skeleton />
        </div>
        <div className={styles.heading1}>
          <Skeleton height={40} />
        </div>
        <div className={styles.hero}>
          <Skeleton className={styles.heroskeleton} height={400} />
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
              <Skeleton count={10} />
            </span>
            <span className={styles.last}>
              <Skeleton width="80%" />
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
            <p>
              <Skeleton width="60%" />
            </p>
            <p>
              <Skeleton width="60%" />
            </p>
            <p>
              <Skeleton width="60%" />
            </p>
            <p>
              <Skeleton width="60%" />
            </p>
            <p>
              <Skeleton width="60%" />
            </p>
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
            <span>
              <Skeleton count={10} />
            </span>
            <span className={styles.last}>
              <Skeleton width="80%" />
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
            <p>
              <Skeleton width="60%" />
            </p>
            <p>
              <Skeleton width="60%" />
            </p>
            <p>
              <Skeleton width="60%" />
            </p>
            <p>
              <Skeleton width="60%" />
            </p>
            <p>
              <Skeleton width="60%" />
            </p>
            <p>
              <Skeleton width="60%" />
            </p>
            <p>
              <Skeleton width="60%" />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default skeleton;
