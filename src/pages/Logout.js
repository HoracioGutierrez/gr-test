import React, { useEffect } from 'react'
import useUsersStore from '../api/usersStore'

const Logout = () => {

    const logout = useUsersStore(({ logout }) => logout)

    useEffect(()=>{
        logout()
    })

    return (
        <div>Loging out...</div>
    )
}

export default Logout