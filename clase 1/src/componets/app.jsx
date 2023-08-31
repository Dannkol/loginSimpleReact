import React from 'react';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Dashboard from './Dashboard';
import Login from './login';
import Layout from './nav';

function App() {
    return (
        <div className="wrapper">
            <h1>Campus</h1>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route index element={<Login></Login>} />
                        <Route path="/dashboard" element={<Dashboard></Dashboard>} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default App;