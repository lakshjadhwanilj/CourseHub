import React from 'react'
// Components
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to CourseHub.</h1> 
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
