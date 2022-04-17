import React, { useState } from 'react';
import Auth from '../components/Auth'
import axios from 'axios';
import { Alert } from 'bootstrap';
import { useNavigate } from 'react-router-dom';


export const SignupView = () => {
    const navigate = useNavigate();



    const emptyForm = {
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    }

    const [confirmPassword, setConfirmPassword] = useState({ confirmPassword: '' });
    const [form, setForm] = useState(emptyForm);

    const handleChange = (evt) => {
        const value = evt.target.value;

        setForm({
            ...form, [evt.target.name]: value
        });

        console.log(form)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (form.password == confirmPassword) {
            // send a POST request
            axios.post('https://surveymeanbackend.herokuapp.com/users/signup', form)
                .then(response => {
                    if (response.status === 200) {
                        navigate("/login")
                    }
                })
                .catch(error => {
                    alert("Error: " + error.message)
                })
        }
        else {
            alert("Passwords do not match")
        }
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className='register-btn-flexbox-container'>
                    <table className='center'>
                        <tbody>
                            <tr>
                                <td><label>Username:</label></td>
                                <td><input type="text" name="username" className="form-element" onChange={handleChange} required /></td>
                            </tr>
                            <tr>
                                <td><label>E-mail:</label></td>
                                <td><input type="email" name="email" className="form-control" onChange={handleChange} required /></td>
                            </tr>
                            <tr>
                                <td><label>Password:</label></td>
                                <td><input type="password" name="password" className="form-control" onChange={handleChange} required /></td>
                            </tr>
                            <tr>
                                <td><label>Confirm Password:</label></td>
                                <td><input type="password" name="confirmPassword" className="form-control" onChange={(e) => setConfirmPassword(e.target.value)} required /></td>
                            </tr>
                            <tr>
                                <td><label>First Name:</label></td>
                                <td><input type="text" name="firstName" className="form-control"
                                    onChange={handleChange}
                                    required /></td>
                            </tr>
                            <tr>
                                <td><label>Last Name:</label></td>
                                <td><input type="text" name="lastName" className="form-control"
                                    onChange={handleChange}
                                    required /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='register-btn-flexbox-container'>
                    <button type='submit' className="btn">Register</button>
                </div>
            </form>
        </div>
    );

}
