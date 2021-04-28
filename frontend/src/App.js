import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// Components
import HomeScreen from './screens/HomeScreen'
import CourseScreen from './screens/CourseScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import PaymentScreen from './screens/PaymentScreen'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollRestoration from './components/ScrollRestoration'
import { Container } from 'react-bootstrap'

const App = () => {
  return (
    <Router>
      <ScrollRestoration />
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/course/:id' component={CourseScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/' exact component={HomeScreen} />
        </Container>
        <ScrollToTop />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
