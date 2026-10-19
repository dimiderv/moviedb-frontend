import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { Film } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { object, ref, string } from 'yup';
import { useRegisterMutation } from '../../features/auth/authApiSlice';
import { getErrorMessage } from '../../utils/getErrorMessage';
import useSlowRequestHint from './useSlowRequestHint';
import styles from './Auth.module.css';

const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const validationSchema = object({
    firstName: string().trim().required('Enter your first name.').max(30, 'Use 30 characters or fewer.'),
    lastName: string().trim().required('Enter your last name.').max(30, 'Use 30 characters or fewer.'),
    username: string()
        .required('Choose a username.')
        .matches(USER_REGEX, '4 to 24 characters. Start with a letter; letters, numbers, - and _ allowed.'),
    email: string().trim().required('Enter your email.').email('Enter a valid email address.'),
    password: string()
        .required('Choose a password.')
        .matches(PWD_REGEX, '8 to 24 characters with upper and lower case letters, a number and one of ! @ # $ %.'),
    matchPassword: string()
        .required('Confirm your password.')
        .oneOf([ref('password')], 'Passwords do not match.'),
});

const FIELDS = {
    firstName: { label: 'First name', autoComplete: 'given-name' },
    lastName: { label: 'Last name', autoComplete: 'family-name' },
    username: { label: 'Username', autoComplete: 'username' },
    email: { label: 'Email', type: 'email', autoComplete: 'email' },
    password: { label: 'Password', type: 'password', autoComplete: 'new-password' },
    matchPassword: { label: 'Confirm password', type: 'password', autoComplete: 'new-password' },
};

export default function Register() {
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
    const [errMsg, setErrMsg] = useState('');
    const isSlow = useSlowRequestHint(isLoading);

    const formik = useFormik({
        initialValues: { firstName: '', lastName: '', username: '', email: '', password: '', matchPassword: '' },
        validationSchema,
        onSubmit: async ({ matchPassword, ...values }) => {
            setErrMsg('');
            try {
                await register({
                    ...values,
                    firstName: values.firstName.trim(),
                    lastName: values.lastName.trim(),
                    email: values.email.trim(),
                }).unwrap();
                navigate('/login', { replace: true, state: { registered: true } });
            } catch (err) {
                setErrMsg(getErrorMessage(err, 'Registration failed. Please try again.'));
            }
        },
    });

    const renderField = (name) => {
        const { label, type = 'text', autoComplete } = FIELDS[name];
        const error = formik.touched[name] && formik.errors[name];
        return (
            <Form.Group className="mb-3" controlId={`register-${name}`}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    type={type}
                    autoComplete={autoComplete}
                    isInvalid={Boolean(error)}
                    aria-describedby={error ? `register-${name}-error` : undefined}
                    {...formik.getFieldProps(name)}
                />
                <Form.Control.Feedback type="invalid" id={`register-${name}-error`}>
                    {error}
                </Form.Control.Feedback>
            </Form.Group>
        );
    };

    return (
        <div className={styles.wrapper}>
            <Form className={`${styles.card} ${styles.cardWide}`} onSubmit={formik.handleSubmit} noValidate>
                <p className={styles.logo}><Film aria-hidden="true" /> MovieDB</p>
                <h1 className={styles.title}>Create your account</h1>
                <p className={styles.switch}>
                    Already registered? <Link to="/login">Sign in</Link>
                </p>

                {errMsg && <Alert variant="danger" role="alert">{errMsg}</Alert>}

                <Row className="g-sm-3">
                    <Col sm={6}>{renderField('firstName')}</Col>
                    <Col sm={6}>{renderField('lastName')}</Col>
                </Row>
                {renderField('username')}
                {renderField('email')}
                {renderField('password')}
                {renderField('matchPassword')}

                <Button type="submit" variant="primary" className="w-100 mt-2" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" aria-hidden="true" className="me-2" />
                            Creating account…
                        </>
                    ) : (
                        'Create account'
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
