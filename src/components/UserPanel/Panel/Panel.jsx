import { useState } from 'react';
import { BarChart, Lock, PersonVcard } from 'react-bootstrap-icons';
import styles from './Panel.module.css';
import UserProfile from './UserProfile/UserProfile';
import SideBarLinks from './SideBarLinks/SideBarLinks';
import UserInformation from './UserInformation/UserInformation';
import UserChangePassword from './UserChangePassword/UserChangePassword';
import Profile from './Profile/Profile';
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice';
import { ErrorState, PageLoader } from '../../PageState/PageState';

const SECTIONS = [
    { id: 'information', text: 'Information', icon: PersonVcard },
    { id: 'password', text: 'Password', icon: Lock },
    { id: 'activity', text: 'Activity', icon: BarChart },
];

function Panel() {
    const [activeSection, setActiveSection] = useState('information');
    const { data: user, isLoading, isError, error, refetch } = useGetUserDataQuery();

    if (isLoading) return <PageLoader label="Loading your account…" />;
    if (isError) return <ErrorState error={error} title="Couldn't load your account" onRetry={refetch} />;

    return (
        <div className={styles.panel}>
            <h1 className="visually-hidden">Account settings</h1>
            <aside className={styles.sidebar}>
                <UserProfile user={user} />
                <SideBarLinks links={SECTIONS} active={activeSection} onChange={setActiveSection} />
            </aside>
            <section className={styles.content}>
                {activeSection === 'information' && <UserInformation user={user} />}
                {activeSection === 'password' && <UserChangePassword />}
                {activeSection === 'activity' && <Profile user={user} />}
            </section>
        </div>
    );
}

export default Panel;
