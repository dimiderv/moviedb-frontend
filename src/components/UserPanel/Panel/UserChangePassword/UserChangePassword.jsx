import { Button, Form, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import { object, ref, string } from 'yup';
import Titles from '../../Titles/Titles';
import FormInput from '../../Forms/FormInput/FormInput';
import { useUpdatePasswordMutation } from '../../../../features/auth/authApiSlice';
import { useToast } from '../../../../context/ToastContext';
import { getErrorMessage } from '../../../../utils/getErrorMessage';

const validationSchema = object({
    currentPassword: string().required('Enter your current password.'),
    newPassword: string()
        .required('Enter a new password.')
        .min(8, 'Use at least 8 characters.')
        .max(72, 'Use 72 characters or fewer.')
        .notOneOf([ref('currentPassword')], 'The new password must be different from the current one.'),
    matchPassword: string()
        .required('Confirm your new password.')
        .oneOf([ref('newPassword')], 'Passwords do not match.'),
});

const UserChangePassword = () => {
    const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
    const { notify } = useToast();

    const formik = useFormik({
        initialValues: { currentPassword: '', newPassword: '', matchPassword: '' },
        validationSchema,
        onSubmit: async ({ currentPassword, newPassword }, { resetForm }) => {
            try {
                const response = await updatePassword({ currentPassword, newPassword }).unwrap();
                notify(response.message);
                resetForm();
            } catch (err) {
                notify(getErrorMessage(err, 'Could not update your password.'), 'danger');
            }
        },
    });

    return (
        <>
            <Titles title="Change password" text="Choose a new password of at least 8 characters." />
            <Form noValidate onSubmit={formik.handleSubmit} className="password-form">
                <FormInput
                    formik={formik}
                    name="currentPassword"
                    label="Current password"
                    type="password"
                    autoComplete="current-password"
                />
                <FormInput
                    formik={formik}
                    name="newPassword"
                    label="New password"
                    type="password"
                    autoComplete="new-password"
                />
                <FormInput
                    formik={formik}
                    name="matchPassword"
                    label="Confirm new password"
                    type="password"
                    autoComplete="new-password"
                />
                <Button type="submit" variant="primary" className="mt-2 px-4" disabled={isLoading}>
                    {isLoading && <Spinner as="span" animation="border" size="sm" aria-hidden="true" className="me-2" />}
                    Update password
                </Button>
            </Form>
        </>
    );
};

export default UserChangePassword;
