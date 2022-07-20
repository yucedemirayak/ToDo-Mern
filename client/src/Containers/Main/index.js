import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const MainContainer = ({ children }) => {
  return (
    <Container>
        <Row>
            <Col md={{span: 4, offset: 4}}>
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default MainContainer