import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollRestoration = () => {

    const { pathName } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathName])
    
    return null
}

export default ScrollRestoration