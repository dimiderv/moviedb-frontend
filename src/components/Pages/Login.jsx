import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { Film } from 'react-bootstrap-icons';
import { selectPersist, setCredentials, setPersist } from '../../features/auth/authSlice';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { getErrorMessage } from '../../utils/getErrorMessage';
import useSlowRequestHint from './useSlowRequestHint';
import styles from './Auth.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const persist = useSelector(selectPersist);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [login, { isLoading }] = useLoginMutation();
    const isSlow = useSlowRequestHint(isLoading);

    const from = location.state?.from?.pathname || '/home';
    const justRegistered = location.state?.registered;

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({ email: email.trim(), password }).unwrap();
            dispatch(setCredentials(userData));
            navigate(from, { replace: true });
        } catch (err) {
            setErrMsg(getErrorMessage(err, 'Login failed. Please try again.'));
        }
    };

    return (
        <div className={styles.wrapper}>
            <Form className={styles.card} onSubmit={handleSubmit} noValidate>
                <p className={styles.logo}><Film aria-hidden="true" /> MovieDB</p>
                <h1 className={styles.title}>Sign in</h1>
                <p className={styles.switch}>
                    New here? <Link to="/register">Create an account</Link>
                </p>

                {justRegistered && !errMsg && (
                    <Alert variant="success">Your account is ready. Sign in to continue.</Alert>
                )}
                {errMsg && <Alert variant="danger" role="alert">{errMsg}</Alert>}

                <Form.Group className="mb-3" controlId="login-email">
                    <Form.Label>Email or username</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="login-password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Check
                    type="switch"
                    id="persist"
                    className="mb-4"
                    label="Trust this device"
                    checked={persist}
                    onChange={(e) => dispatch(setPersist(e.target.checked))}
                />

                <Button type="submit" variant="primary" className="w-100" disabled={isLoading || !email.trim() || !password}>
                    {isLoading ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" aria-hidden="true" className="me-2" />
                            Signing in…
                        </>
                    ) : (
                        'Sign in'
                    )}
                </Button>
                {isSlow && (
                    <p className={styles.hint} role="status">
                        The server is waking up. The first request can take up to a minute.
                    </p>
                )}
            </Form>
        </div>
    );
}
