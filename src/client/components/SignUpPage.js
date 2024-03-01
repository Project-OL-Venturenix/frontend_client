import React, {useState} from 'react';
import {signUpUser} from "../api/AuthApi";

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
        <div className="container"
             style={{
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center'
             }}
        >
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-6/292037637_1989864014557999_7909280466945465412_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=y42qL3eD5UgAX9mIoOR&_nc_ht=scontent-hkg1-1.xx&oh=00_AfDqKRjIFSDip_dvmRA7ntkJEN3rDyFGPrah-UXIlprhOQ&oe=65E44CDC"
                                className="img-fluid"
                                alt="Sample image"
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <h2 className="mb-4">Signup</h2>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">First Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstname"
                                        value={userData.firstname}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Last Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastname"
                                        value={userData.lastname}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mobile:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="mobile"
                                        value={userData.mobile}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Username:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={userData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={userData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Company:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="company"
                                        value={userData.company}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Title:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={userData.title}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="status"
                                        value={userData.status}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                    Signup
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignupPage;