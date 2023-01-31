import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser, FaMailBulk } from 'react-icons/fa'
import { AiFillSetting } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import { logout, reset } from '../features/auth/authSlice'

function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header className='header'>
            <div className="logo">
                <Link to='/'>GIFTED</Link>
            </div>
            <ul>
                {user ? (
                    <>
                        <li>
                            <Link to='/messages/Inbox'>
                                <FaMailBulk /> Messages
                            </Link>
                        </li>
                        <li>
                            <Link to='/settings'>
                                <AiFillSetting /> Settings
                            </Link>
                        </li>
                        <li>
                            <button className='btn' onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )
                }
            </ul >
        </header >
    )
}

export default Header