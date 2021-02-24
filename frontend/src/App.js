import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// Components
import HomeScreen from './screens/HomeScreen'
import CourseScreen from './screens/CourseScreen'
import CartScreen from './screens/CartScreen'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { Container } from 'react-bootstrap'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' exact component={HomeScreen} />
          <Route path='/course/:id' component={CourseScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
        </Container>
        <ScrollToTop />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
