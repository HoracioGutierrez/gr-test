import React from 'react'

const Page = ({ title = "Default Title", noTitle = false , children }) => {
    return (
        <>
            {noTitle ? null : <h1 className='page__title'>{title}</h1>}
            {
                Array.isArray(children)
                ? children.map((child, index) => {
                    return <section className='page__section' id={`page__section_${index}`} key={index}>{child}</section>
                })
                : <section className='page__section' id="page__section_0">{children}</section>
            }
        </>
    )
}

export default Page