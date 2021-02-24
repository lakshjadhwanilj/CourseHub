import React, { useState, useEffect } from 'react'
import { useWindowScroll } from 'react-use'
import { Button } from 'react-bootstrap'

const ScrollToTop = () => {

    const { y: pageYOffset } = useWindowScroll()
    const [visibile, setVisibility] = useState(false)
    
    useEffect(() => {
        if (pageYOffset > 400) {
            setVisibility(true)
        } else {
            setVisibility(false)
        }
    }, [pageYOffset])

    const scrollToTop = () => window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })

    if (!visibile) {
        return false
    }

    return (
        <Button className='scroll-to-top btn btn-warning btn-lg rounded-lg text-center text-dark border-dark' onClick={scrollToTop}>
            <i className='fas fa-chevron-up'></i>
        </Button>
    )
}

export default ScrollToTop