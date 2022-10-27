import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useUsersStore from '../api/usersStore'
import Page from '../layout/Page'
import { getUsersByDistance, updateUserLocation } from '../utils'
import UserListLoader from '../widgets/UserListLoader'


const Users = () => {

    const { current: { uid }, setUsers: setLocalUsers, users: localUsers } = useUsersStore(({ current, setUsers, users }) => ({ current, setUsers, users }))

    const [users, setUsers] = useState(localUsers)

    useEffect(() => {

        const geoId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords
            handleGetUsers(latitude, longitude)
        })

        return () => {
            navigator.geolocation.clearWatch(geoId)
        }
    }, [])

    const handleGetUsers = async (latitude, longitude) => {
        try {
            await updateUserLocation(uid, latitude, longitude)
            const users = await getUsersByDistance(uid,latitude, longitude)
            setUsers(users)
            setLocalUsers(users)
        } catch (error) {
            console.log(error)
        }
    }

    if (!users.length) return <Page title="Users" noTitle={true}><UserListLoader/></Page>

    return (
        <Page title='Users' noTitle>
            <div className='userlist'>
                {users.map(user => (
                    <article key={user.uid} className="userlist__card">
                        <Link to={`/users/${user.uid}`}>
                            <img className='userlist__card-avatar' src="/anon-avatar.png" />
                            <h3 className='userlist__card-name'>{user.displayName || "Random"}</h3>
                            <p className='userlist__card-distance'>a {Math.round(user.distance / 1000)}km</p>
                        </Link>
                    </article>
                ))}
            </div>
        </Page>
    )
}

export default Users