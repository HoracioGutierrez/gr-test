import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Page from '../layout/Page'
import { getUserInfo } from '../utils'

const UserProfile = () => {

    const { id } = useParams()
    const [userinfo, setUserinfo] = useState(null)
    const [showDescription, setShowDescription] = useState(false)

    useEffect(() => {
        handleUserInfo()
    }, [])

    const handleUserInfo = async () => {
        const userInfo = await getUserInfo(id)
        setUserinfo(userInfo)
    }

    const toggleDescription = () => {
        setShowDescription(!showDescription)
    }

    if (!userinfo) return <Page noTitle={true}><div>Loading...</div></Page>

    return (
        <div className='userinfo'>
            <img className='userinfo__avatar' src="/anon-avatar.png" />
            <div className='userinfo__actions-overlay' onClick={toggleDescription}>
                <div className='userinfo__header'>
                    <h3 className='userinfo__name'>{userinfo.displayName || "Random"} {userinfo.age} </h3>
                    <nav className='userinfo__actions'>
                        <Link to={`/messages/${userinfo.uid}`}>
                            <i className="material-icons">chat</i>
                        </Link>
                        <Link to={`/block/${userinfo.uid}`}>
                            <i className="material-icons">block</i>
                        </Link>
                        <Link to={`/like/${userinfo.uid}`}>
                            <i className="material-icons">star</i>
                        </Link>
                        <Link to={`/tap/${userinfo.uid}`}>
                            <i className="material-icons">thumb_up</i>
                        </Link>
                    </nav>
                </div>
                <div className='userinfo__extra'>
                    <p className="userinfo__description">{userinfo.description}</p>
                    <p> position : {userinfo.position || "not defined"}</p>
                </div>
            </div>
        </div>
    )
}

export default UserProfile