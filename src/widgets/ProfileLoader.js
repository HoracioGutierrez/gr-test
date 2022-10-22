import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProfileLoader = () => {
    return (
        <div className='loader-form form'>
            <div className="form__control">
                <label htmlFor="displayName">Display Name</label>
                <Skeleton height={20} />
            </div>
            <div className="form__control">
                <label htmlFor="email">Email</label>
                <Skeleton height={20} />
            </div>
            <div className="form__control">
                <label htmlFor="position">Position</label>
                <Skeleton height={20} />
            </div>
            <div className="form__control">
                <label htmlFor="age">Age</label>
                <Skeleton height={20} />
            </div>
        </div>
    )
}

export default ProfileLoader