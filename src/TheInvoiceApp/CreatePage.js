import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
const CreatePage = () => {

    return (
        <>
            <Container className='py-2 px-2 border '>
                < Col lg={4} className='text-center border rounded py-1 px-1' >
                    <h1>A new way to send and receive invoices.</h1>
                    <p>Our new e-invoicing network allows you to connect with customers, send invoices, and get paid. Sign up for Invoiced to securely send digital invoices to your customers from Invoice Generator.
                    </p>
                    <Link to="/create"><Button variant="primary" type="submit">Create An Account</Button></Link>
                </Col>
                <hr></hr>
            </Container>
        </>
    )
}
export default CreatePage;