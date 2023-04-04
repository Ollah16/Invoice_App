import React, { useState } from 'react';
import { Link } from 'react-router-dom'; import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

const LandingPage = ({ data, getData, myBoo, boot }) => {
    let [logo, setLogo] = useState('')
    let [sender, setSender] = useState('')
    let [billTo, setBillTo] = useState('')
    let [shipTo, setShipTo] = useState('')
    let [invoiceNum, setInvNumber] = useState('')
    let [date, setDate] = useState('')
    let [terms, setTerms] = useState('')
    let [dueDate, setDuedate] = useState('')
    let [poNumber, setPoNum] = useState('')
    let [item, setItem] = useState('')
    let [quantity, setQty] = useState('')
    let [rate, setRate] = useState('')
    let [amount, setAmount] = useState('')
    let [note, setNote] = useState('')
    let [condTerms, setCondTerms] = useState('')
    let [subTotal, setSubTotal] = useState('')
    let [boo, setBoo] = useState(false)
    let [theBoo, setTheBoo] = useState(false)
    let [themBoo, setThemBoo] = useState(false)
    let [discount, setDiscount] = useState('')
    let [tax, setTax] = useState('')
    let [ship, setShip] = useState('')
    let [total, setTotal] = useState('')
    let [boo3, setBoo3] = useState(false)

    const funcRate = (e, index) => {
        let dataArr = [...data]
        dataArr[index].rate = Number(e)
        if (dataArr[index].quantity > 0 && dataArr[index].rate > 0) {
            dataArr[index].amount = dataArr[index].quantity * dataArr[index].rate
            setTotal(dataArr.reduce((acc, each) => acc + each.amount, 0))
        }
        getData(dataArr)
        console.log(dataArr[index].amount)

    }
    const funcQty = (e, index) => {
        let dataArr = [...data]
        dataArr[index].quantity = Number(e)
        if (dataArr[index].quantity > 0 && dataArr[index].rate > 0) {
            dataArr[index].amount = dataArr[index].quantity * dataArr[index].rate
            setTotal(dataArr.reduce((acc, each) => acc + each.amount, 0))
        }
        getData(dataArr)
    }
    const funcItem = (e, index) => {
        let dataArr = [...data]
        dataArr[index].item = e.target.value
        getData(dataArr)
    }
    const lineItem = () => {
        getData([...data, { amount: 0 }])
    }
    const delBtn = index => {
        getData(data.filter((_, i) => i !== index))
    }
    // const downBtn = () => {
    //   setData([...data, { logo, sender, quantity, billTo, shipTo, invoiceNum, date, terms, dueDate, poNumber, rate, amount, note, discount, ship, tax, boo }])
    // }
    const disBtn = () => {
        setBoo(true)
    }
    const taxBtn = e => {
        setTheBoo(true)
    }
    const shipBtn = () => {
        setThemBoo(true)
    }
    const delDiscount = () => {
        setBoo(false)
        let dataArr = [...data]
        setTotal(dataArr.reduce((acc, each) => acc + each.amount, 0))
    }
    const delTax = () => {
        setTheBoo(false)
        let dataArr = [...data]
        setTotal(dataArr.reduce((acc, each) => acc + each.amount, 0))
    }
    const delShip = () => {
        setThemBoo(false)
        let dataArr = [...data]
        setTotal(dataArr.reduce((acc, each) => acc + each.amount, 0))
    }
    const funcTax = e => {
        let dataArr = [...data]
        tax = e.target.value
        if (tax > 0) {
            total += tax / 100 * total
            setTotal(total)
        }
        else (
            setTotal(dataArr.reduce((acc, each) => acc + each.amount, 0) + discount + ship)
        )

    }
    const funcDisc = e => {
        let dataArr = [...data]
        discount = e.target.value
        if (discount > 0) {
            total -= discount / 100 * total
            setTotal(total)
        }
        else (
            setTotal(dataArr.reduce((acc, each) => acc + each.amount, 0) + ship + tax)
        )
    }
    const funcShip = e => {
        let dataArr = [...data]
        ship = Number(e.target.value)
        if (ship > 0) {
            setTotal(total + ship)
        }
        else (
            setTotal(dataArr.reduce((acc, each) => acc + each.amount, 0) + discount + tax)
        )
    }
    const signUp = () => {
        setBoo3(true)

    }
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Col lg={4}>
                        <Navbar.Brand href="#home">Invoice Generator</Navbar.Brand>
                    </Col>
                    <Col lg={8}>
                        <Nav className="me-auto px-2">
                            <Nav.Link className='me-5' href="#home">Invoice Guide</Nav.Link>
                            <Nav.Link className='me-5' href="#home">Help</Nav.Link>
                            <Link to='./sign'><Button className='btn-primary mx-3' onClick={signUp}>Sign In</Button></Link>
                            <Link to='./pagecreate'><Button className='btn-primary mx-3' onClick={signUp}>Sign Up</Button></Link>
                        </Nav>
                    </Col>
                </Container>
            </Navbar>

            <Container className="border border-dark px-3 py-1 border-2 rounded-bottom bg-light border-top-0">
                <Row className='d-flex justify-content-between align-items-center'>
                    <Col lg={6} className='mt-4'>

                        <InputGroup className="mb-1 " style={{ height: '120px', width: '200px' }}>
                            <Form.Control
                                className='text-center bg-light'
                                placeholder="+ Add You Logo"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>

                        <InputGroup className="mb-1" style={{ height: '70px' }}>
                            <Form.Control
                                placeholder="Who is the invoice to?(required)"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>

                        <Row >
                            <Col>
                                <Form.Group  >
                                    <Form.Label >Bill To</Form.Label>
                                    <Form.Control type="text" placeholder="Who is the invoice to?(required)" style={{ height: '70px' }} />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group >
                                    <Form.Label>Ship To</Form.Label>
                                    <Form.Control type="text" placeholder="(optional)" style={{ height: '70px' }} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>

                    <Col lg={4} style={{ width: '30%' }} >
                        <h1>INVOICE</h1>

                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
                            <Form.Control
                                className='text-end'
                                placeholder="1"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>

                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2">Date</InputGroup.Text>
                            <Form.Control
                                type='date'
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>

                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2">Payment Terms</InputGroup.Text>
                            <Form.Control
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>

                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2">Due Date</InputGroup.Text>
                            <Form.Control
                                type='date'
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>

                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2">PO Number</InputGroup.Text>
                            <Form.Control
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <Table className='my-3 text-center align-baseline' striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Details</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((each, index) => (<tr key={index}>
                            <td>{index + 1}</td>
                            <td><InputGroup className="mb-1">
                                <Form.Control onInput={(event) => funcItem(event.target.value, index)} placeholder='description of products' aria-describedby="basic-addon2" /></InputGroup></td>
                            <td><InputGroup className="mb-1">
                                <Form.Control onInput={(event) => funcQty(event.target.value, index)} placeholder='1' aria-label="Recipient's username" aria-describedby="basic-addon2" /></InputGroup></td>
                            <td><InputGroup className="mb-1">
                                <Form.Control onInput={(event) => funcRate(event.target.value, index)} placeholder='0' aria-label="Recipient's username" aria-describedby="basic-addon2" /></InputGroup></td>
                            <td>${each.amount}</td>
                            {data.length > 1 ? <td><Button onClick={() => delBtn(index)}>x</Button></td> : ''}
                        </tr>))}
                    </tbody>
                </Table>

                <Col>
                    <Button variant="success" size="sm" lg={3} onClick={lineItem}>+ Line Item</Button>{' '}
                </Col>

                <Row className='d-flex justify-content-between'>

                    <Col className='mt-5 align-items-end' lg={5}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Notes</Form.Label>
                                <Form.Control type="text" placeholder="Notes- Any relevenat informatikon not already covered" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Terms</Form.Label>
                                <Form.Control type="password" placeholder="Terms & conditions-late fees, payment method, delivery schedule" />
                            </Form.Group>
                        </Form>
                    </Col>

                    <Col lg={4}>
                        <Row>
                            <Col className='pe-0 ps-2.5'>
                                <Form.Control
                                    defaultValue={'SUBTOTAL'}
                                />
                            </Col>
                            <Col className='ps-0'>
                                <Form.Control
                                    onChange={setTotal}
                                    value={total}
                                />
                            </Col>
                        </Row>



                        <Row className='align-items-end'>
                            <Col>
                                <Row class='d-inline'>
                                    <Button className='mb-2 border-0' variant="outline-success" onClick={() => disBtn()}>+ Discount</Button>{' '}
                                    {boo ? <><Form.Control style={{ width: '100px' }} onInput={(event) => funcDisc(event)} /><button type="button" onClick={() => delDiscount()} class="btn-close" aria-label="Close"></button>{' '}</> : ''}
                                </Row>
                            </Col>

                            <Col>
                                <Button className='mb-2 border-0' variant="outline-success" onClick={() => taxBtn()}>+ Tax</Button>{' '}
                            </Col>
                            {theBoo ? <><Col><Form.Control onInput={(event) => funcTax(event)} placeholder='%' /></Col><Col><button type="button" class="btn-close" aria-label="Close" onClick={() => delTax()}></button>{' '}</Col></> : ''}

                            <Col>
                                <Button className='mb-2 border-0' variant="outline-success" onClick={() => shipBtn()}>+ Shipping</Button>{' '}
                            </Col>
                            {themBoo ? <><Col><Form.Control onInput={(event) => funcShip(event)} placeholder='%' /></Col><Col><button type="button" class="btn-close" aria-label="Close" onClick={() => delShip()}></button>{' '}</Col></> : ''}
                        </Row>

                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2">Total</InputGroup.Text>
                            <Form.Control
                                onChange={setTotal}
                                value={total}
                            />
                        </InputGroup>

                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2">Amount Paid</InputGroup.Text>
                            <Form.Control
                            />
                        </InputGroup>

                        <Row>
                            <Col className='pe-0 ps-2.5'>
                                <Form.Control
                                    defaultValue={'Balance Due'}
                                />
                            </Col>
                            <Col className='ps-0'>
                                <Form.Control
                                    onChange={setTotal}
                                    value={total}
                                />
                            </Col>
                        </Row>
                    </Col >
                </Row >
            </Container >

            <footer>
                <div className="container bg-light">

                    <Row>
                        <Col lg={4}>
                            <h5>Use Invoice Generator</h5>
                            <Button className='mb-2 border-0' variant="outline-success">Invoice Template</Button>{' '}<br></br>
                            <Button className='mb-2 border-0' variant="outline-success">How To Use</Button>{' '}<br></br>
                            <Button className='mb-2 border-0' variant="outline-success">Sign In</Button>{' '}<br></br>
                            <Button className='mb-2 border-0' variant="outline-success">Sign Up</Button>{' '}<br></br>
                            <Button className='mb-2 border-0' variant="outline-success">Release Notes</Button>{' '}
                        </Col>

                        <Col lg={4}>
                            <h5>Education</h5>
                            <Button className='mb-2 border-0' variant="outline-success" >Invoice Guides</Button>{' '}<br></br>
                            <Button className='mb-2 border-0' variant="outline-success" >Blog</Button>{' '}
                        </Col>

                        <Col lg={4}>
                            <h5>Education</h5>
                            <Button className='mb-2 border-0' variant="outline-success">Terms Of Use</Button>{' '}
                        </Col>
                    </Row>
                </div>
            </footer>
        </>
    )
}
export default LandingPage;