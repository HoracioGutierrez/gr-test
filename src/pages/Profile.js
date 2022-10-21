import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../api/firebase'
import useUsersStore from '../api/usersStore'
import Page from '../layout/Page'
import { updateUserInfo } from '../utils'

const Profile = () => {

    const { uid } = useUsersStore(({ current }) => current)
    const [userData, setUserData] = useState()

    useEffect(() => {

        const getOwnData = async () => {
            const userCollection = collection(db, 'users')
            const q = query(userCollection, where('uid', '==', uid))
            const querySnapshot = await getDocs(q)
            const data = querySnapshot.docs.map(doc => doc.data())
            setUserData(data[0])
        }

        getOwnData()

    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await updateUserInfo(uid, userData)
    }

    console.log(userData)

    if (!userData) return <Page title="Profile" noTitle={true}><div>Loading...</div></Page>

    return (
        <Page title='Profile'>

            <form onSubmit={handleSubmit} className="profileform">

                <div className='profileform__control'>
                    <label htmlFor="displayName">Display Name</label>
                    <input type="text" name="displayName" id="displayName" value={userData.displayName} onChange={handleChange} />
                </div>

                <div className='profileform__control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={userData.email} onChange={handleChange} />
                </div>

                <div className='profileform__control'>
                    <label htmlFor="position">Position</label>
                    <select name="position" id="position" value={userData.position} onChange={handleChange}>
                        <option value="botton">botton</option>
                        <option value="top">top</option>
                        <option value="vers/top">vers/top</option>
                        <option value="vers/bottom">vers/bottom</option>
                    </select>
                </div>

                <div className='profileform__control'>
                    <label htmlFor="age">Age</label>
                    <input type="number" name="age" id="age" value={userData.age} onChange={handleChange} />
                </div>

                <button>Update</button>

            </form>

        </Page>
    )
}

export default Profile