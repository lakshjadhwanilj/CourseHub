import React from 'react'
// Components
import { Navbar, Nav, Container } from 'react-bootstrap'
import logo from '../assets/images/logo.png'

const Header = () => {
    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <Navbar.Brand href='/'>
                        <img
                            src={logo}
                            height='50'
                            className='d-inline-block align-top'
                            alt='CourseHub'
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>
                            <Nav.Link href='/cart'>
                                <i className='fas fa-shopping-cart'></i> CART
                            </Nav.Link>
                            <Nav.Link href='/login'>
                                <i className='fas fa-user'></i> SIGN IN
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
