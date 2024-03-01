import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthProvider";
import {SearchProvider} from "./context/SearchProvider";
import {ToastProvider} from "./context/ToastContext";
import {disableReactDevTools} from '@fvilers/disable-react-devtools';

// if(process.env.NODE_ENV === 'production') disableReactDevTools();

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <SearchProvider>
                    <ToastProvider>
                        <Routes>
                            <Route path="/*" element={<App/>}/>
                        </Routes>
                    </ToastProvider>
                </SearchProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();