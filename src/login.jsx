import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/authcontext.provider';
import logo from './assets/logo.png';

export const Login = () => {
    const navigate = useNavigate();
    const { setUser, access_token, setToken } = useAuth();

    useEffect(() => {
        if (access_token) {
            navigate('/home');
        }
    }, [access_token]);

    const localStorageHandle = (user, token) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('access_token', token);
        setUser(user);
        setToken(token);
    };

    const loginUser = async (e) => {
        e.preventDefault();
        const mobile_no = e.target.mobile_no.value.trim();
        const password = e.target.password.value;

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile_no, password }),
            });

            const data = await res.json();

            if (data.success && data.data) {
                const { user, access_token } = data.data;
                localStorageHandle(user, access_token);
                navigate('/home');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            alert('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-green-900 flex flex-col items-center justify-center z-[9999]">
            <img src={logo} alt="Logo" className="w-60 h-45 mb-6" />
            <div className="w-full max-w-md px-3 ">
                <h1 className="text-white text-2xl text-center mb-4">LOGIN</h1>

                <Form
                    onSubmit={loginUser}
                    className="bg-green-200 rounded-2xl p-6 m-10 shadow-md"
                >
                    <Form.Group controlId="formMobile" className="mb-3">
                        <Form.Control
                            type="text"
                            name="mobile_no"
                            placeholder="Enter Mobile No"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-4">
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            required
                        />
                    </Form.Group>

                    <div className="text-center">
                        <Button type="submit" variant="primary">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};
