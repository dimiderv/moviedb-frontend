import { Toast, ToastContainer } from 'react-bootstrap';
import { useToast } from '../context/ToastContext';

const ToastMsgContainer = () => {
    const { toasts, dismiss } = useToast();

    return (
        <ToastContainer position="bottom-end" className="p-3 app-toasts" containerPosition="fixed">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    bg={toast.variant}
                    onClose={() => dismiss(toast.id)}
                    autohide
                    delay={3500}
                >
                    <Toast.Header closeLabel="Dismiss notification">
                        <strong className="me-auto">MovieDB</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">{toast.message}</Toast.Body>
                </Toast>
            ))}
        </ToastContainer>
    );
};

export default ToastMsgContainer;
