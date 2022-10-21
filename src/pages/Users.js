import { GeoPoint, collection, getDocs, query, updateDoc, where, startAt, endAt, orderBy } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../api/firebase'
import useUsersStore from '../api/usersStore'
import Page from '../layout/Page'
import * as geofire from 'geofire-common';


const Users = () => {

    const [users, setUsers] = useState([])
    const { uid } = useUsersStore(({ current }) => current)

    useEffect(() => {
        const getUsersByDistance = async (latitude, longitude) => {

            const center = [latitude, longitude]
            const radiusInM = 50 * 1000;
            const bounds = geofire.geohashQueryBounds(center, radiusInM);

            const promises = [];

            for (const b of bounds) {
                const q = collection(db, 'users')
                const q2 = query(q, orderBy("location.hash"), startAt(b[0]), endAt(b[1]))
                promises.push(getDocs(q2));
            }


            const snap = await Promise.all(promises);
            const matchingDocs = [];
            for (const s of snap) {
                for (const doc of s.docs) {
                    const distanceInKm = geofire.distanceBetween(center, [doc.data().location.latitude, doc.data().location.longitude]);
                    const distanceInM = distanceInKm * 1000;
                    if (distanceInM <= radiusInM) {
                        matchingDocs.push({doc, distanceInM});
                    }
                }
            }

            const users = matchingDocs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.doc.data(),
                    distance: doc.distanceInM
                }
            })

            setUsers(users)
        }

        const updateUserLocation = async (latitude, longitude) => {
            try {
                const snapShot = await getDocs(query(collection(db, 'users'), where('uid', '==', uid)))
                const doc = snapShot.docs[0]
                await updateDoc(doc.ref, {
                    location: {
                        hash: geofire.geohashForLocation([latitude, longitude]),
                        latitude: latitude,
                        longitude: longitude,
                        geoPoint: new GeoPoint(latitude, longitude)
                    }
                })
                console.log("User's location updated")

            } catch (error) {
                console.log(error)
            }
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords
            getUsersByDistance(latitude, longitude)
            updateUserLocation(latitude, longitude)
        })
    }, [])

    return (
        <Page title='Users'>
            <div className='userlist'>
                {users.map(user => (
                    <article key={user.uid} className="userlist__card">
                        <h3>{user.email}</h3>
                        <p>a {Math.round(user.distance/1000)}km</p>
                    </article>
                ))}
            </div>
        </Page>
    )
}

export default Users