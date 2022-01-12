import styles from '../styles/Home.module.css'
import Image from 'next/image'

export const Footer = () => (
    <footer className={styles.footer}>
        <a
        href="https://krausehouse.club"
        target="_blank"
        rel="noopener noreferrer"
        >
        Powered by{' '}
        <span className={styles.logo}>
            <Image src="/kh_holo.png" alt="KH Logo" width={16} height={16} />
        </span>
        </a>
    </footer>
)