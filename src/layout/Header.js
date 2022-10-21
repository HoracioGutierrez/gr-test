import React from 'react'
import { Link } from 'react-router-dom'
import useUsersStore from '../api/usersStore'

const Header = () => {

  const logged = useUsersStore(({ loggued }) => loggued)

  return (
    <header className='header'>
      <h1 className='header__title'>GR Test</h1>
      <nav className='headernav'>
        <Link className='headernav__link' to="/">home</Link>
        {!logged && <Link className='headernav__link' to="/login">login</Link>}
        {!logged && <Link className='headernav__link' to="/register">register</Link>}
        {logged && <Link className='headernav__link' to="/users">users</Link>}
        {logged && <Link className='headernav__link' to="/profile">profile</Link>}
        {logged && <Link className='headernav__link' to="/logout">logout</Link>}
      </nav>
    </header>
  )
}

export default Header