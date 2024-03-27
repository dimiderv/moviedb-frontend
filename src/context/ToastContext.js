// ToastContext.js
import { createContext, useContext, useState } from 'react';

const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
    const [toastMessages, setToastMessages] = useState([]);

    const showToast =  async (promise, movie,errorMessage) => {
        console.log(promise)
        try {
            const response = await promise;
            const successMessage =  response; // Assuming the success message is in the JSON response
            // console.log(successMessage.data)
            // const successMessage = "Stack "+ Math.random();
            // with RTK query there is no data object .data.message => .message
            setToastMessages((prevMessages) => [...prevMessages, successMessage.message]);
        } catch (error) {
            // console.log(error.response.data.message)
            // no response.data only
            setToastMessages((prevMessages) => [...prevMessages, error.data.message]);
        }
    };

    const hideToast = (index) => {
        setToastMessages((prevMessages) => prevMessages.filter((_, i) => i !== index));
    };

    return (
        <ToastContext.Provider value={{ toastMessages, showToast, hideToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
