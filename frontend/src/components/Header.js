import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
// Components
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
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
            <Navbar className='py-1 text-uppercase font-weight-bold' bg='dark' variant='dark' expand='lg' fixed='top' collapseOnSelect>
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
                        <Route render={({ history }) => <SearchBox history={history}/>} />
                        <Nav className='ml-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <i className='fas fa-shopping-cart fa-sm text-warning'></i> Cart
                                </Nav.Link>
                            </LinkContainer>
                            {
                                userInfo && userInfo.isAdmin && (
                                    <NavDropdown
                                        title={<span><i className='fas fa-user-cog fa-sm text-warning'></i> Admin</span>} id='adminmenu'>
                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item className='font-weight-bold'>Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/courselist'>
                                            <NavDropdown.Item className='font-weight-bold'>Courses</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/orderlist'>
                                            <NavDropdown.Item className='font-weight-bold'>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )
                            }
                            {
                                userInfo ? 
                                    <NavDropdown
                                        title={<span><i className='fas fa-user fa-sm text-warning'></i> {userInfo.name}</span>}
                                        id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item className='font-weight-bold'>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item className='font-weight-bold' onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                : 
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <i className='fas fa-user text-warning'></i> Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
