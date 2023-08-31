import React, { useState, useEffect } from "react";


function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
  }

const Login = (user) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Login Here</h3>

                <label for="username">Username</label>
                <input type="text" placeholder="Email or Phone" id="username" name="username"/>

                <label for="password">Password</label>
                <input type="password" placeholder="Password" id="password" name="password" />

                <button type="sudmit" >Log In</button>
            </form>
        </div>

    )
}

export default Login;