import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const EditProfile = () => {

    const emptyForm = {
        username: localStorage.getItem('username'),
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    }

    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState({ confirmPassword: '' });
    const [form, setForm] = useState(emptyForm);

    const handleChange = (evt) => {
        const value = evt.target.value;
        setForm({
            ...form, [evt.target.name]: value
        })
        console.log(form)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (form.password == confirmPassword) {
            // send a POST request
            alert('UPDATING')
            navigate('/')
            // axios.put('https://surveymeanbackend.herokuapp.com/users/signup', form)
            //     .then(response => {
            //         if (response.status === 200) {
            //             navigate("/login")
            //         }
            //     })
            //     .catch(error => {
            //         alert("Error: " + error.message)
            //     })
        }
        else {
            alert("Passwords do not match")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='register-btn-flexbox-container'>
                <table className='center'>
                    <tbody>
                        <tr>
                            <td><label>First Name:</label></td>
                            <td><input type="text" name="firstName" className="form-control"
                                onChange={handleChange}
                            /></td>
                        </tr>
                        <tr>
                            <td><label>Last Name:</label></td>
                            <td><input type="text" name="lastName" className="form-control"
                                onChange={handleChange}
                            /></td>
                        </tr>
                        <tr>
                            <td><label>E-mail:</label></td>
                            <td><input type="email" name="email" className="form-control" onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Password:</label></td>
                            <td><input type="password" name="password" className="form-control" onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Confirm Password:</label></td>
                            <td><input type="password" name="confirmPassword" className="form-control" onChange={(e) => setConfirmPassword(e.target.value)} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='register-btn-flexbox-container'>
                <button type='submit' className="btn">Save Changes</button>
            </div>
        </form>
    );
}
