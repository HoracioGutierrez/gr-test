import React from 'react'
import { Link } from 'react-router-dom'
import useUsersStore from '../api/usersStore'

const Footer = () => {

    const logged = useUsersStore(({ logged }) => logged)

    if(!logged) return null

    return (
        <footer className='footer'>
            <nav className='footernav'>
                <Link className='footernav__link' to="/">
                    <i className="material-icons">home</i>
                </Link>
                <Link className='footernav__link' to="/users">
                    <i className="material-icons">people</i>
                </Link>
                <Link className='footernav__link' to="/profile">
                    <i className="material-icons">person</i>
                </Link>
                <Link className='footernav__link' to="/messages">
                    <i className="material-icons">chat</i>
                </Link>
            </nav>
        </footer>
    )
}

export default Footer