import React from 'react'

const Page = ({ title = "Default Title", noTitle = false , children }) => {
    return (
        <>
            {noTitle ? null : <h1>{title}</h1>}
            {
                Array.isArray(children)
                ? children.map((child, index) => {
                    return <section key={index}>{child}</section>
                })
                : <section>{children}</section>
            }
        </>
    )
}

export default Page