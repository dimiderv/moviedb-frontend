import styles from './Titles.module.css';

const Titles = ({ title, text }) => (
    <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {text && <p className={styles.text}>{text}</p>}
    </header>
);

export default Titles;
