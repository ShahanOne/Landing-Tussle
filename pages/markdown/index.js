import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './index.module.scss';
import markdownStyles from './markdown.module.scss';

function index() {
  const [MDText, setMDText] = useState('');
  return (
    <div className={styles.md_wrapper}>
      <p className={styles.headings}>Markdown input</p>
      <textarea
        name="mdtext"
        className={styles.mdinp}
        cols="30"
        rows="10"
        value={MDText}
        onChange={(e) => setMDText(e.target.value)}
      ></textarea>

      <p className={styles.headings}>HTML Output</p>
      <ReactMarkdown
        className={markdownStyles.markdown}
        children={MDText}
        remarkPlugins={[remarkGfm]}
      />
    </div>
  );
}

export default index;
