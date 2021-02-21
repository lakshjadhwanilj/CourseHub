import React from 'react'
// Components
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        Copyright &copy; CourseHub
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
