import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import FormInput from '../../Forms/FormInput/FormInput';
import Titles from '../../Titles/Titles';
import { useUpdateUserDetailsMutation } from '../../../../features/auth/authApiSlice';
import { useToast } from '../../../../context/ToastContext';
import { getErrorMessage } from '../../../../utils/getErrorMessage';

const validationSchema = object({
    firstName: string().trim().required('Enter your first name.').max(30, 'Use 30 characters or fewer.'),
    lastName: string().trim().required('Enter your last name.').max(30, 'Use 30 characters or fewer.'),
    email: string().trim().required('Enter your email.').email('Enter a valid email address.'),
    birthday: string(),
});

const UserInformation = ({ user }) => {
    const [updateUserDetails, { isLoading }] = useUpdateUserDetailsMutation();
    const { notify } = useToast();

    const formik = useFormik({
        initialValues: {
            firstName: user.firstName?.trim() || '',
            lastName: user.lastName?.trim() || '',
            email: user.email || '',
            birthday: user.birthday || '',
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await updateUserDetails({
                    firstName: values.firstName.trim(),
                    lastName: values.lastName.trim(),
                    email: values.email.trim(),
                    birthday: values.birthday,
                }).unwrap();
                notify(response.message);
                resetForm({ values });
            } catch (err) {
                notify(getErrorMessage(err, 'Could not update your details.'), 'danger');
            }
        },
    });

    return (
        <>
            <Titles title="Personal information" text="Update your name, email and birthday." />
            <Form noValidate onSubmit={formik.handleSubmit}>
                <Row>
                    <Col md={6}>
                        <FormInput formik={formik} name="firstName" label="First name" autoComplete="given-name" />
                    </Col>
                    <Col md={6}>
                        <FormInput formik={formik} name="lastName" label="Last name" autoComplete="family-name" />
                    </Col>
                    <Col md={6}>
                        <FormInput formik={formik} name="email" label="Email" type="email" autoComplete="email" />
                    </Col>
                    <Col md={6}>
                        <FormInput formik={formik} name="birthday" label="Birthday" type="date" autoComplete="bday" />
                    </Col>
                </Row>
                <Button type="submit" variant="primary" className="mt-2 px-4" disabled={isLoading || !formik.dirty}>
                    {isLoading && <Spinner as="span" animation="border" size="sm" aria-hidden="true" className="me-2" />}
                    Save changes
                </Button>
            </Form>
        </>
    );
};

export default UserInformation;
