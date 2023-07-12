import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LandingPage from './TheInvoiceApp/LandingPage';
import './App.css'
import DownloadPage from './TheInvoiceApp/pageDownload';

const App = () => {
  let [item, setItem] = useState('')
  let [quantity, setQty] = useState('')
  let [rate, setRate] = useState('')
  let [amount, setAmount] = useState('')
  let [data, setData] = useState([{ item, quantity, rate, amount }])
  let [invoice, setInvoice] = useState('')
  const navigate = useNavigate()


  const handleLining = (any, e, index) => {
    let allData = [...data];
    switch (true) {
      case any === 'lineItem':
        setData([...data, { item, quantity, rate, amount }]);
        break;
      case any === 'rate':
        setData(allData.map((a, i) => i === index ? ({
          ...a,
          rate: a.rate = e,
          amount: Number(a.quantity * a.rate)
        }) : a))
        break;
      case any === 'qty':
        setData(allData.map((a, i) => i === index ? ({
          ...a,
          quantity: a.quantity = e,
          amount: Number(a.quantity * a.rate)
        }) : a))
        break;
      case any === 'item':
        allData[index].item = e
        setData(allData)
        break;
      case any === 'rem':
        allData = allData.filter((a, i) => i !== index)
        setData(allData)
        break;
    }
  }

  const hanldeInvoiceDownload = (invoiceDetails) => {
    let { logo, reciever, billTo, shipTo, poNumber, terms, invoiceNum, date, dueDate, amountPaid, condTerms, subTotal, note, total, disc, tax, ship, balance } = invoiceDetails
    setInvoice({ ...invoice, data, logo, reciever, billTo, shipTo, poNumber, terms, invoiceNum, date, dueDate, amountPaid, condTerms, subTotal, note, total, disc, tax, ship, balance })
    if (subTotal !== '' && logo !== '') { navigate('/download') }
  }

  return (
    <Routes>
      <Route path='/*' element={<LandingPage data={data} handleLining={handleLining} hanldeInvoiceDownload={hanldeInvoiceDownload} />} />
      <Route path='/download' element={<DownloadPage hanldeInvoiceDownload={hanldeInvoiceDownload} invoice={invoice} />} />
    </Routes>
  )
}
export default App;