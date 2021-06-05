import React from 'react';
import styles from './Footer.module.css';
import { ReactComponent as Dogs } from '../Assets/dogs-footer.svg';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Dogs />
      <p className={styles.footerText}>Dogs. Made by <a href="instagram.com/davi.feittosa">@davifeittosa</a></p>
    </footer>
  );
}
