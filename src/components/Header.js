import Logo from './logo.png'
import React, { useEffect, useState } from 'react'

const Header = () => {

    const [loadingUser, setLoadingUser] = useState(false);


    useEffect(() => {
        // code to run on component mount
        if (localStorage.getItem('token')) {
            setLoadingUser(true)
        }
        else {
            setLoadingUser(false)
        }
    }, [])

    const handleSignout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        window.location.replace("/");
    }

    return (
        <div className='horizontal-navbar'>
            <ul>
                <li><a href='/'><img src={Logo} height={20} /></a> </li>
                <li><a href='/'> Home</a></li>
                <li><a href='/surveys'> Surveys</a></li>
                {loadingUser ?
                    <li>
                        <table>
                            <tbody>
                                <tr>
                                    <td><button className='btn' onClick={handleSignout}>Sign Out</button></td>
                                    <td><a href='/profile'>{`Hi, ${localStorage.getItem('username')}`}</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </li>
                    : <li><a href='/login'>Login</a></li>}
            </ul>
        </div>
    );
}

export default Header;
