import { ChevronRight } from 'react-bootstrap-icons';
import styles from './SideBarLink.module.css';

const SideBarLink = ({ text, icon: Icon, active, onSelect }) => (
    <button
        type="button"
        className={`${styles.link} ${active ? styles.active : ''}`}
        aria-current={active ? 'page' : undefined}
        onClick={onSelect}
    >
        <Icon aria-hidden="true" />
        <span className={styles.text}>{text}</span>
        <ChevronRight aria-hidden="true" className={styles.chevron} />
    </button>
);

export default SideBarLink;
