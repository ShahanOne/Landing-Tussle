import React from "react";

import styles from "./index.module.scss";

const CardHippo = ({
  instructorName,
  instructorQualification,
  instructorDetails,
  className,
  instructorImage,
  instructorContactLink,
}) => (
  <div
    className={
      className ? `${styles.mainContainer} ${className}` : styles.mainContainer
    }
  >
    <div className={styles.instructorDetails}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${instructorImage})` }}
      />
      <div className={styles.text}>
        <p className={styles.title}>Meet Your Instructor, {instructorName}</p>
        <p className={styles.qual}>{instructorQualification}</p>
        <div className={styles.verifiedField}>
          <img src="/images/verifiedTick.svg" className={styles.verifiedIcon} />
          <p className={styles.verifiedText}>Verified</p>
        </div>
        <p className={styles.instructorDetails}>{instructorDetails}</p>
      </div>
    </div>
    <button
      className={styles.contact}
      type="button"
      onClick={() => window.location = instructorContactLink}
    >
      Contact Host
    </button>
  </div>
);

export default CardHippo;
