import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
// Components
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import logo from '../assets/images/logo.png'

const Header = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

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
                                    <i className='fas fa-shopping-cart fa-sm text-warning'></i> CART
                                </Nav.Link>
                            </LinkContainer>
                            {
                                userInfo ? 
                                    <NavDropdown
                                        title={<span><i className='fas fa-user fa-sm text-warning'></i> {userInfo.name}</span>} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                : 
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <i className='fas fa-user text-warning'></i> SIGN IN
                                        </Nav.Link>
                                    </LinkContainer>
                            }
                            {
                                userInfo && userInfo.isAdmin && (
                                    <NavDropdown
                                        title={<span><i className='fas fa-user-cog fa-sm text-warning'></i> Admin</span>} id='adminmenu'>
                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/courselist'>
                                            <NavDropdown.Item>Courses</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/orderlist'>
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
