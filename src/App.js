import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './TheInvoiceApp/LandingPage';
import './App.css'

const App = () => {
  let [item, setItem] = useState('')
  let [quantity, setQty] = useState(0)
  let [rate, setRate] = useState(0)
  let [amount, setAmount] = useState('')
  let [data, setData] = useState([{ item, quantity, rate, amount }])

  const handleLining = (any, e, index) => {
    let allData = [...data];
    switch (true) {
      case any === 'lineItem':
        setData([...data, { item, quantity, rate, amount }]);
        break;
      case any === 'rate':
        setData(allData.map((a, i) => i === index ? ({
          ...a,
          rate: e,
          amount: a.quantity * a.rate
        }) : a))
        break;
      case any === 'qty':
        setData(allData.map((a, i) => i === index ? ({
          ...a,
          quantity: e,
          amount: a.quantity * a.rate
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

  return (
    <Routes>
      <Route path='/*' element={<LandingPage data={data} handleLining={handleLining} />} />
    </Routes>
  )
}
export default App;