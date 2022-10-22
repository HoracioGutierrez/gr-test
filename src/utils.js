import { addDoc, collection, endAt, GeoPoint, getDocs, orderBy, query, startAt, updateDoc, where } from "firebase/firestore";
import { db } from "./api/firebase";
import * as geofire from 'geofire-common';

export const getUsersByDistance = async (latitude, longitude) => {

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

    return users
}

export const updateUserLocation = async (uid,latitude, longitude) => {
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
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const updateUserInfo = async (uid, data) => {
    try {
        const snapShot = await getDocs(query(collection(db, 'users'), where('uid', '==', uid)))
        const doc = snapShot.docs[0]
        await updateDoc(doc.ref, data)
        console.log("User's info updated")
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getUserInfo = async (uid) => {
    try {
        const snapShot = await getDocs(query(collection(db, 'users'), where('uid', '==', uid)))
        const doc = snapShot.docs[0]
        return doc.data()
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getMessages = async (id,uid) => {
    try {
        const snapShot = await getDocs(query(collection(db, 'messages'), where('participants', 'array-contains-any', [uid,id])))
        const docs = snapShot.docs
        return docs.map(doc => doc.data())[0]
    } catch (error) {
        console.log(error)
        return false
    }
}

export const sendMessage = async (uid, message) => {
    try {
        const snapShot = await getDocs(query(collection(db, 'messages'), where('participants', 'array-contains-any', [message.sender, message.receiver])))
        const doc = snapShot.docs[0]
        if (doc) {
            await updateDoc(doc.ref, {
                messages: [...doc.data().messages, message]
            })
        } else {
            await addDoc(collection(db, 'messages'), {
                participants: [message.sender, message.receiver],
                messages: [message]
            })
        }
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}