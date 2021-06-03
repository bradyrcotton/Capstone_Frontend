import React from 'react';
import ReactDom from 'react-dom';
import App from './Components/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';


ReactDom.render(
    <Router>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Router>,
    document.getElementById('root')
);