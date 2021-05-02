import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={ description }/>
            <meta name='keywords' content={ keywords}/>
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to CourseHub',
    description: 'Find the best courses online!',
    keywords: 'courses, online courses, free courses'
}

export default Meta
