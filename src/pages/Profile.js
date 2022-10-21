import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../api/firebase'
import useUsersStore from '../api/usersStore'
import Page from '../layout/Page'

const Profile = () => {

    const { uid } = useUsersStore(({ current }) => current)
    const [userData, setUserData] = useState()

    useEffect(()=>{

        const getOwnData = async () => {
            const userCollection = collection(db, 'users')
            const q = query(userCollection, where('uid', '==', uid))
            const querySnapshot = await getDocs(q)
            const data = querySnapshot.docs.map(doc => doc.data())
            setUserData(data[0])
        }

        getOwnData()

    },[])

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData({
            ...userData,
            [name]: value
        })
    }

    if(!userData) return <Page title="Profile" noTitle={true}><div>Loading...</div></Page>

    return (
        <Page title='Profile'>

            <div>
                <label htmlFor="displayName">Display Name</label>
                <input type="text" name="displayName" id="displayName"/>
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={userData.email} onChange={handleChange}/>
            </div>

            <div>
                <label htmlFor="position">Position</label>
                <select name="position" id="position">
                    <option value="botton">botton</option>
                    <option value="top">top</option>
                    <option value="vers/top">vers/top</option>
                    <option value="vers/bottom">vers/bottom</option>
                </select>
            </div>

            <div>
                <label htmlFor="age">Age</label>
                <input type="number" name="age" id="age" />
            </div>

            <button>Update</button>

        </Page>
    )
}

export default Profile