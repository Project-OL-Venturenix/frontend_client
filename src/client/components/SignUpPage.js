import React, { useState } from 'react';
import {signUpUser} from "../api/UserApi";

const SignupPage = () => {
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        mobile: '',
        email: '',
        username: '',
        password: '',
        company: '',
        title: '',
        status: '',
    });

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            console.log(userData);
            const response = await signUpUser(userData);
            console.log('Signup successful:', response.data);
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form>
                <label>
                    First Name:
                    <input type="text" name="firstname" value={userData.firstname} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Last Name:
                    <input type="text" name="lastname" value={userData.lastname} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Mobile:
                    <input type="text" name="mobile" value={userData.mobile} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="text" name="email" value={userData.email} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Username:
                    <input type="text" name="username" value={userData.username} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={userData.password} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Company:
                    <input type="text" name="company" value={userData.company} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Title:
                    <input type="text" name="title" value={userData.title} onChange={handleChange} />
                </label>
                <label>
                    Status:
                    <input type="text" name="status" value={userData.status} onChange={handleChange} />
                </label>
                <br />
                <button type="button" onClick={handleSubmit}>
                    Signup
                </button>
            </form>
        </div>
    );
};

export default SignupPage;