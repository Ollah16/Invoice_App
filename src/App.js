import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './TheInvoiceApp/SignIn';
import LandingPage from './TheInvoiceApp/LandingPage';
import CreatePage from './TheInvoiceApp/CreatePage';
import RegPage from './TheInvoiceApp/RegPage';




const App = () => {
  let [data, setData] = useState([{ amount: 0, rate: 0 }])
  let [boot, setBoo] = useState(true)

  const getData = dData => {
    setData(dData)
  }

  const myBoo = getBoo => {
    setBoo(getBoo)
  }

  return (
    <>


      {/* <Route path='/adminpage/*' element={<AdminPage products={products} addbtn={addbtn} funcBoo={funcBoo} />} /> */}
      <Routes>
        <Route path='/*' element={<LandingPage data={data} getData={getData} />} />
        <Route path='/pagecreate' element={<CreatePage />} />
        <Route path='/create' element={<RegPage />} />
        <Route path='/sign' element={<SignIn />} />
      </Routes>
      {/* Total ${total}
        <br></br>
        <input defaultValue={'Amount Paid'} />   <input defaultValue={'$0.00'} />
        <br></br>
        <input defaultValue={'Balance Due'} />   ${total}
        <br></br>
      </div>
      <button onClick={downBtn}>Download</button>  */}
    </>
  )
}
export default App;