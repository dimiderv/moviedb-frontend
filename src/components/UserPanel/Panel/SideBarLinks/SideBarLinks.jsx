import SideBarLink from './SideBarLink/SideBarLink';
import styles from './SideBarLinks.module.css';

const SideBarLinks = ({ links, active, onChange }) => (
    <nav aria-label="Settings sections" className={styles.nav}>
        <ul className={styles.list}>
            {links.map((link) => (
                <li key={link.id}>
                    <SideBarLink {...link} active={active === link.id} onSelect={() => onChange(link.id)} />
                </li>
            ))}
        </ul>
    </nav>
);

export default SideBarLinks;
