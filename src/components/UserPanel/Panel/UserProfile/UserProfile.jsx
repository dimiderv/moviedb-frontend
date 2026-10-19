import styles from './UserProfile.module.css';

const initialsOf = ({ firstName, lastName, username }) => {
    const initials = `${firstName?.trim()?.[0] || ''}${lastName?.trim()?.[0] || ''}`;
    return (initials || username?.[0] || '?').toUpperCase();
};

const formatDate = (value) => {
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? null
        : date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

const UserProfile = ({ user }) => {
    const fullName = [user.firstName, user.lastName].map((part) => part?.trim()).filter(Boolean).join(' ');
    const memberSince = formatDate(user.entryDate);

    return (
        <div className={styles.profile}>
            <div className={styles.avatar} aria-hidden="true">{initialsOf(user)}</div>
            <p className={styles.username}>{fullName || user.username}</p>
            {fullName && <p className={styles.handle}>@{user.username}</p>}
            <dl className={styles.details}>
                <dt>Email</dt>
                <dd>{user.email}</dd>
                {memberSince && (
                    <>
                        <dt>Member since</dt>
                        <dd>{memberSince}</dd>
                    </>
                )}
            </dl>
        </div>
    );
};

export default UserProfile;
