import React from 'react';
import {BrowserRouter} from "react-router-dom";

import axios from 'axios';

import Routes from 'routes';

axios.defaults.withCredentials = true;

const App = () => {
    return (
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    );
}

export default App;