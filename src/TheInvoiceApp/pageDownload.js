import React from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import html2pdf from 'html2pdf.js'

const DownloadPage = ({ invoice }) => {
    let dPage = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        const downPage = () => {
            const pageId = dPage.current
            const opt = {
                margin: [0, 0, 0, 0],
                filename: 'invoice.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 5 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(pageId).save();
        }
        downPage();
        navigate('/')
    }, [invoice])

    return (<Container ref={dPage} className='border border-black p-1'>
        <Row>
            <Col lg={3} md={3} sm={3} xs={3} className='m-1'>
                <img src={require(`./assets/imgs/${invoice.logo}`)} style={{ height: '8em', width: '8em' }} />
            </Col>
        </Row>
        <Row className='d-flex justify-content-between align-items-center m-1'>
            <Col lg={5} md={6} sm={12} xs={12} className='border px-0 pe-0'>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <span>Receiver</span> : <span>{invoice.receiver}</span>
                </Col>
                <hr className='my-0'></hr>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <span>Bill To</span> : <span>{invoice.billTo}</span>
                </Col>
                <hr className='my-0'></hr>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <span>Ship To</span> : <span>{invoice.shipTo}</span>
                </Col>
            </Col>

            <Col lg={5} md={6} sm={12} xs={12} className='border px-0 pe-0'>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <span>Invoice Number</span> : <span>{invoice.invNumber}</span>
                </Col>
                <hr className='my-0'></hr>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <span>Invoice Date</span> : <span>{invoice.date}</span>
                </Col>
                <hr className='my-0'></hr>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <span>Invoice Terms</span> : <span>{invoice.terms}</span>
                </Col>
                <hr className='my-0'></hr>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <span>Due Date</span> : <span>{invoice.dueDate}</span>
                </Col>
                <hr className='my-0'></hr>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <span>PO Number</span> : <span>{invoice.poNumber}</span>
                </Col>
            </Col>
        </Row>

        <Row className='m-1'>
            <Col className='table_responsive' lg={12} md={12} sm={12} xs={12}>
                <Table hover striped bordered>
                    <thead>
                        <tr className='text-center'>
                            <th>S/N</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.data.map((all, i) => (<tr key={i} className='text-center'>
                            <td>{i + 1}</td>
                            <td>{all.item}</td>
                            <td>{all.quantity}</td>
                            <td>{all.rate}</td>
                            <td>{all.amount}</td>
                        </tr>))}
                    </tbody>
                </Table>
            </Col>
        </Row>

        {invoice.subTotal ?
            <Row className='d-flex justify-content-end m-1'>
                <Col lg={5} md={5} sm={12} xs={12} className='border'>
                    <span className='m-1'>Subtotal</span>:<span className='m-1'>{invoice.subTotal}</span>
                </Col>
            </Row>
            : ''}

        <Row className='m-1 d-flex align-items-center justify-content-between'>
            <Col lg={5} md={5} sm={12} xs={12} className='mt-5'>
                {invoice.note ? <div className='border m-1'><span className='m-1'>Note</span>:<span className='m-1'>{invoice.note}</span></div> : ''}
                {invoice.condTerms ? <div className='border m-1'><span className='m-1'>Conditonal Terms</span>:<span className='m-1'>{invoice.condTerms}</span></div> : ''}
            </Col>

            <Col lg={5} md={5} sm={12} xs={12} className='d-flex'>

                {invoice.disc ?
                    <Col className='m-1 text-center border'>
                        <span>Discount</span> : <span>{invoice.disc}</span>
                    </Col>
                    : ''}

                {invoice.tax ?
                    <Col className='m-1 text-center border'>
                        <span>Tax</span> : <span>{invoice.tax}</span>
                    </Col>
                    : ''}

                {invoice.ship ?
                    <Col className='m-1 text-center border'>
                        <span>Shipping</span> : <span>{invoice.ship}</span>
                    </Col>
                    : ''}

            </Col>
        </Row >

        <Row className='d-flex justify-content-end m-1'>
            {invoice.total || invoice.subTotal ?
                <Col lg={3} md={2} sm={12} xs={12} className='border m-1'>
                    <span>Total</span>:<span>{invoice.total ? invoice.total : invoice.subTotal}</span>
                </Col>
                : ''}

            {invoice.amountPaid ?
                <Col lg={3} md={2} sm={12} xs={12} className='border m-1'>
                    <span>Amount Paid</span>:<span>{invoice.amountPaid}</span>
                </Col>
                : ''}

            {invoice.balance ?
                <Col lg={3} md={2} sm={12} xs={12} className='border m-1'>
                    <span>Balance</span>:<span>{invoice.balance}</span>
                </Col>
                : ''}

        </Row >
    </Container >)
}
export default DownloadPage;