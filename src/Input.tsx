import React, { useState } from 'react'
import Table from './Table'

export interface InputProps {
  acquisitionCost: number;  // total acquisition cost, taxes included
  loan: number;
  loanRate: number;
  realtyMV: number;  // mv = market value
  realtyMVRate: number;  // annual market value growth rate
  rentalCost: number;
  rentalCostRate: number;  // annual rental growth rate
  annualTaxes: number;
}


export interface OutputProps {
  loanMain: number[],  // loan main amount (aka principal)
  loanInterest: number[],
  annualTaxes: number[],
  annualRentalCost: number[],
  annualRepaymentAmount: number[],  // annual amount to pay for the loan payment
  realtyMV: number[],
  liquidationValue: number[],
  sunkCostBuy: number[],
  sunkCostRent: number[],
  sunkCostDelta: number[],  //  sunkCostRent - sunkCostBuy + liquidationValue
}

const Input = (): React.JSX.Element => {

    const table = <Table />;

    const [inputData, setInputData] = useState<InputProps> ({
      acquisitionCost: 340000,
      loan: 300000,
      loanRate: 3.0,
      realtyMV: 300000,
      realtyMVRate: 1.0,
      rentalCost: 1000,
      rentalCostRate: 1.0,
      annualTaxes: 1300,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setInputData(prevData => ({...prevData, [name]: value}))
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          console.log("Draw logic goes here");
          console.log(e.target.acost.value)
          console.log(inputData)

        }catch (error) {
          console.error(error);
        }
    }

  return (
    <div className="InputPage">
      <form onSubmit={handleSubmit}>

        <label htmlFor="acquisitionCost">Acquisition cost</label>
        <input type="number" name="acquisitionCost" id="acost" onChange={handleChange} value={inputData.acquisitionCost}></input>

        <label htmlFor="loan">loan</label>
        <input type="number" name="loan" id="loan" onChange={handleChange} value={inputData.loan}></input>

        <label>loan rate</label>
        <input type="number" name="loanRate" id="loanRate" onChange={handleChange} value={inputData.loanRate}></input>
        <br/>
        <label htmlFor="realtyMV">Realty market value</label>
        <input type="number" name="realtyMV" id="realtyMV" onChange={handleChange} value={inputData.realtyMV}></input>

        <label htmlFor="realtyMVRate">Realty market value growth</label>
        <input type="number" name="realtyMVRate" id="realtyMVRate" onChange={handleChange} value={inputData.realtyMVRate}></input>

        <label htmlFor="rentalCost">Rental cost</label>
        <input type="number" name="rentalCost" id="rentalCost" onChange={handleChange} value={inputData.rentalCost}></input>

        <label htmlFor="rentalCostRate">Rental cost rate</label>
        <input type="number" name="rentalCostRate" id="rentalCostRate" onChange={handleChange} value={inputData.rentalCostRate}></input>

        <button>Submit</button>
      </form>
      <div>
        <Table />
      </div>
    </div>
  );
}

export default Input;
