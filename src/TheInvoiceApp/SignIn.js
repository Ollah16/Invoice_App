import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const SignIn = () => {

    return (

        <>
            <Container className='border py-2 px-2'>
                <Row>
                    <Col lg={4} ></Col>
                    <Col lg={4} className='py-1 px-1'></Col>
                    <Col lg={4} ></Col>
                </Row>
                <Row>
                    <Col lg={4} ></Col>
                    <Col lg={4} className='border rounded py-1 px-1 position-relative '>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPasswor">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="I agree to the terms and conditions" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                    <Col lg={4} ></Col>
                </Row>
                <Row>
                    <Col lg={4} ></Col>
                    <Col lg={4} className='py-1 px-1'></Col>
                    <Col lg={4} ></Col>
                </Row>
            </Container>
        </>
    )
}
export default SignIn;