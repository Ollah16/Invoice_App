import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
const RegPage = () => {
    return (
        <>
            <Container className='border'>
                <Col lg={4} className="border rounded px-2 py-2 my-2 mx-2">

                    <div className='text-center color-blue'>
                        <h3>Create A Free Account</h3>
                        <p>Invoiced Business Network is 100% free to use for buyers and sellers</p>
                    </div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control type="email" placeholder="Company Name" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

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
            </Container>
        </>
    )
}
export default RegPage;