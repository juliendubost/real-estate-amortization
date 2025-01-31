import React, { useState } from 'react'
import Table from './Table'

export interface InputProps {
  acquisitionCost: number;  // total acquisition cost, taxes included
  cash: number;
  loan: number;
  loanRate: number;
  loanYears: number;
  realtyMV: number;  // mv = market value
  realtyMVRate: number;  // annual market value growth rate
  rentalCost: number;
  rentalCostRate: number;  // annual rental growth rate
  annualTaxes: number;
  annualTaxesRate: number;
}

const Input = (): React.JSX.Element => {

    const [inputData, setInputData] = useState<InputProps> ({
      acquisitionCost: 340000,
      cash: 30000,
      loan: 300000,
      loanRate: 3.0,
      loanYears: 4,
      realtyMV: 300000,
      realtyMVRate: 1.0,
      rentalCost: 1000,
      rentalCostRate: 1.0,
      annualTaxes: 1300,
      annualTaxesRate: 1.5,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setInputData(prevData => ({...prevData, [name]: value}))
    }


    const handleReset = () => {


    }

  return (
    <div className="InputPage">
      <form>

        <label htmlFor="acquisitionCost">Acquisition cost</label>
        <input type="number" name="acquisitionCost" id="acost" onChange={handleChange} value={inputData.acquisitionCost}></input>

        <label htmlFor="loan">loan</label>
        <input type="number" name="loan" id="loan" onChange={handleChange} value={inputData.loan}></input>

        <label>loan rate</label>
        <input type="number" name="loanRate" id="loanRate" onChange={handleChange} value={inputData.loanRate}></input>

        <label>loan years</label>
        <input type="number" name="loanYears" id="loanYears" onChange={handleChange} value={inputData.loanYears}></input>

        <label htmlFor="realtyMV">Realty market value</label>
        <input type="number" name="realtyMV" id="realtyMV" onChange={handleChange} value={inputData.realtyMV}></input>

        <label htmlFor="realtyMVRate">Realty market value growth</label>
        <input type="number" name="realtyMVRate" id="realtyMVRate" onChange={handleChange} value={inputData.realtyMVRate}></input>

        <label htmlFor="rentalCost">Rental cost</label>
        <input type="number" name="rentalCost" id="rentalCost" onChange={handleChange} value={inputData.rentalCost}></input>

        <label htmlFor="rentalCostRate">Rental cost rate</label>
        <input type="number" name="rentalCostRate" id="rentalCostRate" onChange={handleChange} value={inputData.rentalCostRate}></input>
      </form>
      <div>
        <Table {...inputData} />
      </div>
    </div>
  );
}



export default Input;
