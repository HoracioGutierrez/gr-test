import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import useUsersStore from '../api/usersStore'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Messages from '../pages/Messages'
import MessagesPrivate from '../pages/MessagesPrivate'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import UserProfile from '../pages/UserProfile'
import Users from '../pages/Users'

const PublicRoute = ({ children }) => {
    const logged = useUsersStore(({ logged }) => logged)
    return logged ? <Navigate to="/" /> : children
}

const PrivateRoute = ({ children }) => {
    const logged = useUsersStore(({ logged }) => logged)
    return logged ? children : <Navigate to="/login" />
}

const Main = () => {
    return (
        <main className='main'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />
                <Route path="/register" element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                } />
                <Route path="/logout" element={
                    <PrivateRoute>
                        <Logout />
                    </PrivateRoute>
                } />
                <Route path="/users" element={
                    <PrivateRoute>
                        <Users />
                    </PrivateRoute>
                } />
                <Route path="/profile" element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                } />
                <Route path="/users/:id" element={
                    <PrivateRoute>
                        <UserProfile />
                    </PrivateRoute>
                } />
                {/* /messages/:id */}
                <Route path="/messages" element={
                    <PrivateRoute>
                        <Messages/>
                    </PrivateRoute>
                } />
                <Route path="/messages/:id" element={
                    <PrivateRoute>
                        <MessagesPrivate/>
                    </PrivateRoute>
                } />
                <Route path="*" element={<div>404</div>} />
            </Routes>
        </main>
    )
}

export default Main