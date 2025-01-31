import React from 'react'
import {InputProps} from './Input'

const Table = (props: InputProps): React.JSX.Element => {

  // initial values
  let loanRateAbs = props.loanRate / 100;
  let rentalCostRatePercent = props.rentalCostRate / 100;

  let firstYearInterest = props.loan * loanRateAbs;
  let firstYearRentCost = props.rentalCost * 12;
  let firstYearSunkCostBuy = firstYearInterest + props.annualTaxes + props.cash + (props.acquisitionCost - props.realtyMV);
  let firstYearLiquidationValue = props.realtyMV - props.loan;

  console.log(props.loanYears);
  let annualPaymentAmount = ((props.loan * loanRateAbs * ((1 + loanRateAbs)) ** props.loanYears) / ((1 + loanRateAbs) ** props.loanYears -1));
  //
  console.log(annualPaymentAmount);

  let years: number[] = [1];
  let principal: number[] = [props.loan];
  let interest: number[] = [firstYearInterest];
  let annualTaxesCost: number[] = [props.annualTaxes];
  let annualRentalCost: number[] = [firstYearInterest];
  let realtyMV: number[] = [props.realtyMV];
  let sunkCostBuy: number[] = [firstYearSunkCostBuy];
  let sunkCostRent: number[] = [firstYearRentCost];
  let liquidationValue: number[] = [firstYearLiquidationValue]
  let sunkCostDelta: number[] = [firstYearRentCost - firstYearSunkCostBuy + firstYearLiquidationValue];

  for (let i=1; i < props.loanYears ; i++) {
    years.push(i+1);
    principal.push(principal[i-1] - (annualPaymentAmount - interest[i-1]));
    interest.push(interest[i-1] * (1 + loanRateAbs));
    annualTaxesCost.push(annualTaxesCost[i-1] * (1 + props.annualTaxesRate / 100));
    annualRentalCost.push(annualRentalCost[i-1] * (1 + props.rentalCostRate / 100));
    realtyMV.push(realtyMV[i-1] * (1 + props.realtyMVRate / 100));
    sunkCostBuy.push(sunkCostBuy[i-1] + annualTaxesCost[i] + interest[i]);
    sunkCostRent.push(sunkCostRent[i-1] + annualRentalCost[i]);
    liquidationValue.push(realtyMV[i] - principal[i]);
    sunkCostDelta.push(sunkCostRent[i] - sunkCostBuy[i] + liquidationValue[i]);
  };

  const getYearData = (year: number): React.JSX.Element => {
    return (
      <tr>
        <td>{year}</td>
        <td>{sunkCostDelta[year].toFixed(0)}</td>
        <td>{sunkCostBuy[year].toFixed(0)}</td>
        <td>{sunkCostRent[year].toFixed(0)}</td>
        <td>{realtyMV[year].toFixed(0)}</td>
        <td>{annualRentalCost[year].toFixed(0)}</td>
        <td>{interest[year].toFixed(0)}</td>
        <td>{principal[year].toFixed(0)}</td>
      </tr>
    )
  };

  return (
    <>
      <div className="container">
        <table>
          <thead>
            <tr>
              <td>annual payment amount</td>
              <td>{annualPaymentAmount.toFixed(0)}</td>
            </tr>
          </thead>
        </table>
     </div>
     <div className="container">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Buy equity</th>
              <th>Sunk buy</th>
              <th>Sunk rent</th>
              <th>Realty market value</th>
              <th>Annual rent cost</th>
              <th>Loan interest</th>
              <th>Loan principal</th>
            </tr>
          </thead>
          <tbody>
            {years.map((element, i) => {return getYearData(i)})}
          </tbody>
        </table>
     </div>
   </>
  )

}

export default Table