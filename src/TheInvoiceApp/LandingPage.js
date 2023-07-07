import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import html2pdf from 'html2pdf.js'


const LandingPage = ({ data, handleLining }) => {
    let downloadPage = useRef()

    let [logo, setLogo] = useState('')
    let [reciever, setReciever] = useState('')
    let [billTo, setBillTo] = useState('')
    let [shipTo, setShipTo] = useState('')
    let [poNumber, setPoNum] = useState('')
    let [terms, setTerms] = useState('')
    let [invoiceNum, setInvNumber] = useState('')
    let [date, setDate] = useState('')
    let [dueDate, setDuedate] = useState('')
    let [amountPaid, setAmountPaid] = useState('')
    let [shipBoo, setSBoo] = useState(true)
    let [disBoo, setDBoo] = useState(true)
    let [taxBoo, setTBoo] = useState(true)
    let [condTerms, setCondTerms] = useState('')
    let [subTotal, setSubTotal] = useState('')
    let [note, setNote] = useState('')
    let [total, setTotal] = useState(0)
    let [disc, setDiscount] = useState(0)
    let [tax, setTax] = useState(0)
    let [ship, setShip] = useState(0)
    let [balance, setBal] = useState()


    useEffect(() => {
        setSubTotal(data.reduce((acc, each) => acc + each.amount, 0))
        if (disc > 0 || tax > 0 || ship > 0) {
            setTotal(subTotal - disc + tax + ship)
        }
        if (amountPaid > total) {
            setBal(0)
        }
        else if (amountPaid < total) {
            setBal(total - amountPaid)
        }

    }, [data, disc, tax, ship, amountPaid, []])

    const handleAll = (any, e, index) => {

        switch (true) {
            case any === 'item':
                handleLining(any, e, index)
                break;
            case any === 'qty':
                handleLining(any, e, index)
                break;
            case any === 'rate':
                handleLining(any, e, index)
                break;
            case any === 'lineItem':
                handleLining(any);
                break;
            case any === 'rem':
                handleLining(any, '', index);
                break;
            case any === 'disClick':
                setDBoo(false);
                break;
            case any === 'taxClick':
                setTBoo(false);
                break;
            case any === 'shipClick':
                setSBoo(false);
                break;
            case any === '!disClick':
                setDBoo(true)
                setDiscount('')
                break;
            case any === '!shipClick':
                setSBoo(true)
                setShip('')
                break;
            case any === '!taxClick':
                setTBoo(true);
                setTax('')
                break;
            case any === 'logo':
                setLogo(e.substring(12));
                break;
            case any === 'tax':
                if (e > 0) {
                    setTax(e / 100 * (subTotal))
                }
                break;
            case any === 'dis':
                if (e > 0) {
                    setDiscount((e / 100) * subTotal)
                }
                break;
            case any === 'ship':
                if (e > 0) {
                    setShip(e)
                }
                break;
            case any === 'download':
                const pageId = downloadPage.current

                const opt = {
                    margin: [0, 0, 0, 0],
                    filename: 'invoice.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 5 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };

                html2pdf().set(opt).from(pageId).save();

                break;
        }

    }

    return (
        <Container fluid>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Col lg={4}>
                        <Navbar.Brand href="#home">Invoice Generator</Navbar.Brand>
                    </Col>
                </Container>
            </Navbar>

            <Container >
                <Row className='d-flex justify-content-around'>
                    <Col lg={10} md={10} sm={12} xs={12} className='border my-3 py-1 border-5 bg-light p-2' ref={downloadPage}>

                        <Row className='d-flex justify-content-between align-items-center'>
                            <h1 className='text-end m-1 d-block d-sm-block d-md-none d-lg-none'>INVOICE</h1>

                            <Col lg={5} md={6} sm={12} xs={12} className='mt-4 d-flex justify-content-center'>
                                <Col>
                                    <Col className='border rounded bg-gray file-input-container my-1 d-flex align-items-center justify-content-center'>
                                        {logo ? <img className='logo' src={require(`./assets/imgs/${logo}`)} /> : '+ Add You Logo'}
                                        < input
                                            type='file'
                                            onInput={(event) => handleAll('logo', event.target.value)}
                                            className='text-center bg-light file-input'
                                            placeholder="+ Add You Logo"
                                            aria-describedby="basic-addon1"
                                        />
                                    </Col>

                                    <InputGroup className="mb-1" style={{ height: '70px' }}>
                                        <Form.Control
                                            onInput={(event) => setReciever(event.target.value)}
                                            value={reciever}
                                            placeholder="Who is the invoice to?(required)"
                                            aria-describedby="basic-addon2"
                                        />
                                    </InputGroup>

                                    <Col className='d-flex justify-content-between'>
                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <Form.Group className='m-1'>
                                                <Form.Label >Bill To</Form.Label>
                                                <Form.Control
                                                    onInput={(event) => setBillTo(event.target.value)}
                                                    value={billTo}
                                                    type="text"
                                                    placeholder="Who is the invoice to?(required)"
                                                    style={{ height: '70px' }} />
                                            </Form.Group>
                                        </Col>

                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <Form.Group className='m-1'>
                                                <Form.Label>Ship To</Form.Label>
                                                <Form.Control
                                                    onInput={(event) => setShipTo(event.target.value)}
                                                    type="text"
                                                    value={shipTo}
                                                    placeholder="(optional)"
                                                    style={{ height: '70px' }} />
                                            </Form.Group>
                                        </Col>
                                    </Col>
                                </Col>
                            </Col>

                            <Col lg={5} md={6} sm={12} xs={12} className='d-flex justify-content-center my-5'>
                                <Col>
                                    <h1 className='text-end m-1 d-none d-sm-none d-md-block d-lg-block'>INVOICE</h1>
                                    <Col className='text-center'>
                                        <InputGroup className="m-1 text-center">
                                            <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
                                            <Form.Control
                                                value={invoiceNum}
                                                onInput={(event) => setInvNumber(event.target.value)}
                                                className='text-end'
                                                placeholder="1"

                                            />
                                        </InputGroup>
                                    </Col>

                                    <Col>
                                        <InputGroup className="m-1">
                                            <InputGroup.Text id="basic-addon2">Date</InputGroup.Text>
                                            <Form.Control
                                                value={date}
                                                onInput={(event) => setDate(event.target.value)}
                                                type='date'
                                            />
                                        </InputGroup>
                                    </Col>

                                    <Col>
                                        <InputGroup className="m-1">
                                            <InputGroup.Text id="basic-addon2">Payment Terms</InputGroup.Text>
                                            <Form.Control
                                                value={terms}
                                                onInput={(event) => setTerms(event.target.value)}
                                                aria-describedby="basic-addon2"
                                            />
                                        </InputGroup>
                                    </Col>

                                    <Col>
                                        <InputGroup className="m-1">
                                            <InputGroup.Text id="basic-addon2">Due Date</InputGroup.Text>
                                            <Form.Control
                                                value={dueDate}
                                                onInput={(event) => setDuedate(event.target.value)}
                                                type='date'
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                            />
                                        </InputGroup>
                                    </Col>

                                    <Col>
                                        <InputGroup className="m-1">
                                            <InputGroup.Text id="basic-addon2">PO Number</InputGroup.Text>
                                            <Form.Control
                                                value={poNumber}
                                                onInput={(event) => setPoNum(event.target.value)}
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                            />
                                        </InputGroup>
                                    </Col>
                                </Col>
                            </Col>
                        </Row >

                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12} className='table-responsive'>
                                <Table className='my-3 text-center bg-black text-white' bordered >
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Description</th>
                                            <th>Qty</th>
                                            <th>Rate</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((each, index) => (<tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><input className='border rounded text-center w-50' value={each.item} onInput={(event) => handleAll('item', event.target.value, index)} placeholder='item' /></td>
                                            <td><input className='border rounded text-center w-50' value={each.quantity} onInput={(event) => handleAll('qty', Number(event.target.value), index)} placeholder='1' /></td>
                                            <td><input className='border rounded text-center w-50' value={each.rate} onInput={(event) => handleAll('rate', Number(event.target.value), index)} placeholder='0' /></td>
                                            <td>${each.amount}</td>
                                            <td>{data.length > 1 ? <button className='bg-black text-white py-0 border-0 bg-transparent' onClick={() => handleAll('rem', '', index)}>x</button> : ''}</td>
                                        </tr>))}
                                    </tbody>
                                </Table>
                            </Col>

                            <Col lg={10} md={10} sm={10} xs={10} className='d-flex justify-content-start'>
                                <Button className='border rounded' variant="success" size="sm" lg={3} onClick={() => handleAll('lineItem')}>+ Line Item</Button>{' '}
                            </Col>
                        </Row>
                        <Row className='d-flex justify-content-end mx-0'>

                            <Col lg={5} md={5} sm={12} xs={12} className='d-flex'>
                                <Col lg={6} className='m-1'>
                                    <input
                                        className='border rounded m-1 w-100 h-100 text-center'
                                        placeholder='SUB TOTAL' />
                                </Col>
                                <Col lg={6} className='m-1'>
                                    <input
                                        defaultValue={subTotal}
                                        className='border rounded m-1 w-100 h-100'
                                    />
                                </Col>
                            </Col>

                        </Row>

                        <Row className='d-flex justify-content-between'>
                            <Col lg={5} md={5} sm={12} xs={12} className='mt-5'>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label>Notes</Form.Label>
                                        <Form.Control
                                            value={note}
                                            onInput={(event) => setNote(event.target.value)}
                                            type="text"
                                            placeholder="Notes- relevant information" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupPassword">
                                        <Form.Label>Terms</Form.Label>
                                        <Form.Control
                                            value={condTerms}
                                            onInput={(event) => setCondTerms(event.target.value)}
                                            placeholder="Terms & conditions-late fees, payment method, delivery schedule" />
                                    </Form.Group>
                                </Form>
                            </Col>

                            <Col lg={5} md={5} sm={12} xs={12} >
                                <Col lg={12} md={12} sm={12} xs={12} className='d-flex'>
                                    <Col className='m-1 text-center'>
                                        <button className='border-0 bg-transparent ' onClick={disBoo ? () => handleAll('disClick') : () => handleAll('!disClick')}><span className='d-block'>{disBoo ? '+' : 'x'}</span> Discount</button>{' '}
                                        {disBoo === false ? <Form.Control className='text-center' onInput={(event) => handleAll('dis', Number(event.target.value))} /> : ''}
                                    </Col>

                                    <Col className='m-1 text-center'>
                                        <button className='border-0 bg-transparent text-center' onClick={taxBoo ? () => handleAll('taxClick') : () => handleAll('!taxClick')}><span className='d-block'>{taxBoo ? '+' : 'x'}</span> Tax</button>{' '}
                                        {taxBoo === false ? <Form.Control className='text-center' onInput={(event) => handleAll('tax', Number(event.target.value))} placeholder='%' /> : ''}
                                    </Col>

                                    <Col className='m-1 text-center'>
                                        <button className='border-0 bg-transparent' onClick={shipBoo ? () => handleAll('shipClick') : () => handleAll('!shipClick')}><span className='d-block'>{shipBoo ? '+' : 'x'}</span> Shipping</button>{' '}
                                        {shipBoo === false ? <Form.Control className='text-center' onInput={(event) => handleAll('ship', Number(event.target.value))} placeholder='%' /> : ''}
                                    </Col>
                                </Col>
                                <Col>
                                    <InputGroup className="m-1">
                                        <InputGroup.Text id="basic-addon2">Total</InputGroup.Text>
                                        <Form.Control
                                            onChange={() => setTotal()}
                                            value={total ? total : subTotal}
                                        />
                                    </InputGroup>
                                </Col>


                                <Col >
                                    <InputGroup className="m-1">
                                        <InputGroup.Text id="basic-addon2">Amount Paid</InputGroup.Text>
                                        <Form.Control
                                            value={amountPaid}
                                            onInput={(event) => setAmountPaid(event.target.value)}
                                        />
                                    </InputGroup>
                                </Col>

                                <Col >

                                    <InputGroup className="m-1">
                                        <InputGroup.Text id="basic-addon2">Balance Due</InputGroup.Text>
                                        <Form.Control
                                            defaultValue={balance}
                                        />
                                    </InputGroup>
                                </Col>

                                <Col className='m-1 w-100'>
                                    <Form.Control
                                        defaultValue={balance}
                                    />
                                </Col>
                            </Col>
                        </Row >
                    </Col >
                    <Col lg={2} md={2} sm={12} xs={12} className='my-3 text-center'>
                        <button className='w-100 border-white text-white download' onClick={() => handleAll('download')}>Dowload</button>
                    </Col>
                </Row >
            </Container >

        </Container >
    )
}
export default LandingPage;