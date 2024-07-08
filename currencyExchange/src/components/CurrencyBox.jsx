import React from 'react'
import {useId} from 'react'

function CurrencyBox({
  label,
  currency,
  currencyValue,
  availableCurrencies,
  isCurrencyEditDisable=false,
  onCurrencyChange,
  onCurrencyValueChange,
  className=""
}) {

  const currencyInputId=useId()

  return (
    <div
      className={`bg-white p-3 rounded-lg text-sm flex ${className}`}
    >
      <div
        className='w-3/4'
      >
        <label
          htmlFor={currencyInputId}
          className='text-black/40 mb-2 inline-block'
        >
          {label}
        </label>
        <input
          id={currencyInputId}
          className='outline-none w-full bg-transparent py-1.5'
          type='number'
          value={currencyValue} 
          disabled={isCurrencyEditDisable}
          onChange={(e)=>onCurrencyValueChange && onCurrencyValueChange(Number(e.target.value))}
        />
      </div>
      <div
        className='w-1/4 flex flex-wrap justify-end text-right'
      >
        <p
          className='text-black/40 mb-2 w-full'
        >
          Currency
        </p>
        <select
          value={currency}
          onChange={(e)=>onCurrencyChange && onCurrencyChange(e.target.value)}
        >
          {availableCurrencies.map((thisCurrency)=>(
            <option key={thisCurrency} value={thisCurrency}>
              {thisCurrency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default CurrencyBox;