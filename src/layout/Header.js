import React from 'react'
import { Link } from 'react-router-dom'
import useUsersStore from '../api/usersStore'

const Header = () => {

  const logged = useUsersStore(({ logged }) => logged)

  return (
    <header className='header'>
      {/* <h1 className='header__title'>GR Test</h1> */}
      <h1 className='header__title'>
        <Link to="/profile">
          <img src="/anon-avatar.png" alt="logo" />
        </Link>
      </h1>
      <div className="header__actions">
        <button className="header__btn">
          <i className="material-icons">search</i>
        </button>
        <button className="header__btn">
          <i className="material-icons">tune</i>
        </button>
        <button className="header__btn">
          <i className="material-icons">sort</i>
        </button>

      </div>

      {/* <nav className='headernav'>
        <Link className='headernav__link' to="/">home</Link>
        {!logged && <Link className='headernav__link' to="/login">login</Link>}
        {!logged && <Link className='headernav__link' to="/register">register</Link>}
        {logged && <Link className='headernav__link' to="/users">users</Link>}
        {logged && <Link className='headernav__link' to="/profile">profile</Link>}
        {logged && <Link className='headernav__link' to="/logout">logout</Link>}
      </nav> */}
    </header>
  )
}

export default Header