import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";




const Login = () => {
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        try {
    
            const settings = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formProps)
            };
            const result = await fetch('http://localhost:5300/api/login', settings)
            const token = await result.json()
            localStorage.setItem('token', token.token );
    
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
    
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Login Here</h3>

                <label for="username">Username</label>
                <input type="text" placeholder="Email or Phone" id="username" name="username" />

                <label for="password">Password</label>
                <input type="password" placeholder="Password" id="password" name="password" />

                <button type="sudmit" >Log In</button>
            </form>
        </div>

    )
}

export default Login;