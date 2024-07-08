import { useCallback, useEffect, useState } from 'react'
import { CurrencyBox } from './components'
import axios from 'axios'

function App() {
  const [to,setTo]=useState('inr');
  const [toValue,setToValue]=useState(1);
  const [from,setFrom]=useState('usd');
  const [fromValue,setFromValue]=useState(1);
  const [currencyInfo,setCurrencyInfo]=useState({});

  useEffect(()=>{
    axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`)
    .then((response)=> {
      setCurrencyInfo(response.data[from])
    })
    .catch((error)=>{
      console.log(error);
      setCurrencyInfo([]);
    })
  },[from,setCurrencyInfo])

  useEffect(()=>{
    setToValue(fromValue*currencyInfo[to] || 0)
  },[fromValue,to,currencyInfo,setToValue])

  const swap=()=>{
    setFromValue(toValue)
    setFrom(to)
    setTo(from)
  }

  return (
    <div
      className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
      style={{
        backgroundImage:`url('https://images.pexels.com/photos/7078666/pexels-photo-7078666.jpeg')`
      }}
    >
      <div
        className='w-full max-w-7xl mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30 flex flex-wrap justify-center items-center'
      >
        <img
          className='w-1/2 rounded-l-lg min-w-lg' 
          src='https://images.pexels.com/photos/889545/pexels-photo-889545.jpeg?auto=compress&cs=tinysrgb&w=600'
        />
        <div 
          className="w-1/2 p-3 min-w-lg"
        >
          <div 
            className="w-full mb-1"
          >
            <CurrencyBox
              label="From"
              currencyValue={fromValue}
              currency={from}
              availableCurrencies={Object.keys(currencyInfo)}
              onCurrencyChange={(newFrom)=>setFrom(newFrom)}
              onCurrencyValueChange={(newFromValue)=>setFromValue(newFromValue)}
            />
          </div>
          <div 
            className="relative w-full h-0.5"
          >
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              onClick={swap}
            >
              swap
            </button>
          </div>
          <div 
            className="w-full mt-1 mb-4"
          >
            <CurrencyBox 
              label="To"
              currencyValue={toValue}
              currency={to}
              availableCurrencies={Object.keys(currencyInfo)}
              isCurrencyEditDisable={true}
              onCurrencyChange={(newTo)=>setTo(newTo)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
