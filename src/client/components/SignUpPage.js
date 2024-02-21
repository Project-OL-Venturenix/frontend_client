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
    });

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await signUpUser(userData);
            console.log('Signup successful:', response.data);
            // 可以在這裡處理註冊成功後的操作，例如重定向到登錄頁面
        } catch (error) {
            console.error('Signup failed:', error);
            // 可以在這裡處理註冊失敗後的操作
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
                <br />
                <button type="button" onClick={handleSubmit}>
                    Signup
                </button>
            </form>
        </div>
    );
};

export default SignupPage;