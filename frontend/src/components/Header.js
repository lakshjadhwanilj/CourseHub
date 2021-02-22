import React from 'react'
// Components
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import logo from '../assets/images/logo.png'

const Header = () => {
    return (
        <header>
            <Navbar className='py-1' bg='dark' variant='dark' expand='lg' fixed='top' collapseOnSelect>
                <Container className='py-0'>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img
                                src={logo}
                                height='50'
                                className='d-inline-block align-top'
                                alt='CourseHub'
                            />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <i className='fas fa-shopping-cart'></i> CART
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/login'>
                                <Nav.Link>
                                    <i className='fas fa-user'></i> SIGN IN
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
