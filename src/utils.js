import { addDoc, collection, endAt, GeoPoint, getDocs, orderBy, query, startAt, updateDoc, where } from "firebase/firestore";
import { db } from "./api/firebase";
import * as geofire from 'geofire-common';
import geohash from 'ngeohash';

export const getUsersByDistance = async (uid, latitude, longitude) => {
 
    const lat = 0.0144927536231884; // degrees latitude per mile
    const lon = 0.0181818181818182; // degrees longitude per mile
    const distance = 10;
    const lowerLat = latitude - (lat * distance);
    const lowerLon = longitude - (lon * distance);
    const greaterLat = latitude + (lat * distance);
    const greaterLon = longitude + (lon * distance);

    const lower = geohash.encode(lowerLat, lowerLon);
    const greater = geohash.encode(greaterLat, greaterLon);

    const range = { lower, greater }

    const q = collection(db, 'users')
    const q2 = query(q,where("location.hash","<=",range.greater),where("location.hash",">=",range.lower))

    const snap = await getDocs(q2);

    const users = []
    const radiusInM = 50 * 1000;
    const center = [latitude, longitude]

    snap.forEach(doc => {
        const distanceInKm = geofire.distanceBetween(center, [doc.data().location.latitude, doc.data().location.longitude]);
        const distanceInM = distanceInKm * 1000;
        if(distanceInM <= radiusInM){
            users.push({
                id: doc.id,
                distance: distanceInM,
                ...doc.data()
            })
        }
    })

    return users.filter(user => user.uid !== uid).sort((a, b) => a.distance - b.distance);
}

export const updateUserLocation = async (uid, latitude, longitude) => {
    try {
        const snapShot = await getDocs(query(collection(db, 'users'), where('uid', '==', uid)))
        const doc = snapShot.docs[0]
        await updateDoc(doc.ref, {
            location: {
                hash : geohash.encode(latitude, longitude),
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

export const getPrivateMessages = async (id, uid) => {
    try {
        const snapShot = await getDocs(query(collection(db, 'messages'), where('participants', 'array-contains', [uid, id])))
        const docs = snapShot.docs
        return docs.map(doc => doc.data())[0] || { messages: [], participants: [id, uid] }
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getPrivateMessagesQueryRef = async (id, uid) => {
    return query(collection(db, 'messages'), where('participants', 'array-contains', [uid, id]))
}

export const getMessages = async (id) => {
    try {
        const snapShot = await getDocs(query(collection(db, 'messages'), where('participants', 'array-contains', id)))
        const docs = snapShot.docs
        return docs.map(doc => doc.data())
    } catch (error) {
        console.log(error)
        return false
    }
}

export const sendMessage = async (uid, message) => {
    try {
        const snapShot = await getDocs(query(collection(db, 'messages'), where('participants', 'array-contains', [message.sender, message.receiver])))
        const doc = snapShot.docs[0]
        if (doc) {
            await updateDoc(doc.ref, {
                messages: [...doc.data().messages, message]
            })
        } else {
            const res = await addDoc(collection(db, 'messages'), {
                participants: [message.sender, message.receiver],
                messages: [message]
            })
            console.log(res)
        }
        console.log(doc)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}