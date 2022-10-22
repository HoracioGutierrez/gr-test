import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const UserListLoader = () => {

    const generateSkeletons = () => {
        const skeletons = []
        for (let i = 0; i < 9; i++) {
            skeletons.push(
                <article key={i} className="userlist__card">
                    <Skeleton circle={true} height={50} width={50} />
                    <Skeleton height={20} width={100} />
                    <Skeleton height={20} width={100} />
                </article>
            )
        }
        return skeletons
    }

    return (
        <div className='loader-grid'>
            {generateSkeletons()}
        </div>
    )
}

export default UserListLoader