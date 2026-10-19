import { Form } from 'react-bootstrap';
import styles from './FormInput.module.css';

// Bootstrap form field wired to a Formik instance.
const FormInput = ({ formik, name, label, type = 'text', autoComplete, className = '', hint }) => {
    const error = formik.touched[name] && formik.errors[name];
    const describedBy = [hint && `${name}-hint`, error && `${name}-error`].filter(Boolean).join(' ') || undefined;

    return (
        <Form.Group controlId={`field-${name}`} className={`${styles.group} ${className}`}>
            <Form.Label className={styles.label}>{label}</Form.Label>
            <Form.Control
                type={type}
                autoComplete={autoComplete}
                isInvalid={Boolean(error)}
                aria-describedby={describedBy}
                {...formik.getFieldProps(name)}
            />
            {hint && !error && (
                <Form.Text id={`${name}-hint`} className={styles.hint}>{hint}</Form.Text>
            )}
            <Form.Control.Feedback type="invalid" id={`${name}-error`}>
                {error}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default FormInput;
