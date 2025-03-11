import React from 'react'
import {InputProps} from './Input'
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Grid
} from '@mui/material'

const Table = (props: InputProps): React.JSX.Element => {

  // initial values
  let loanRateAbs = props.loanRate / 100;
  let rentalCostRatePercent = props.rentalCostRate / 100;
  let initialCash = props.acquisitionCost - props.loan;

  let firstYearInterest = props.loan * loanRateAbs;
  let firstYearRentCost = props.rentalCost * 12;
  let firstYearSunkCostBuy = firstYearInterest + props.annualTaxes + initialCash + (props.acquisitionCost - props.realtyMV);
  let firstYearLiquidationValue = props.realtyMV - props.loan;

  console.log(firstYearInterest);
  console.log(props.annualTaxes);
  console.log(props.acquisitionCost);
  console.log(props.realtyMV);
  console.log(firstYearSunkCostBuy);
  let annualPaymentAmount = ((props.loan * loanRateAbs * ((1 + loanRateAbs)) ** props.loanYears) / ((1 + loanRateAbs) ** props.loanYears -1));
  //

  let years: number[] = [1];
  let principal: number[] = [props.loan];
  let interest: number[] = [firstYearInterest];
  let annualTaxesCost: number[] = [props.annualTaxes];
  let annualRentalCost: number[] = [firstYearRentCost];
  let realtyMV: number[] = [props.realtyMV];
  let sunkCostBuy: number[] = [firstYearSunkCostBuy];
  let sunkCostRent: number[] = [firstYearRentCost];
  let liquidationValue: number[] = [firstYearLiquidationValue]
  let sunkCostDelta: number[] = [firstYearRentCost - firstYearSunkCostBuy + firstYearLiquidationValue];

  for (let i=1; i < props.loanYears ; i++) {
    years.push(i+1);
    principal.push(principal[i-1] - (annualPaymentAmount - interest[i-1]));
    interest.push(principal[i] * loanRateAbs);
    annualTaxesCost.push(annualTaxesCost[i-1] * (1 + props.annualTaxesRate / 100));
    annualRentalCost.push(annualRentalCost[i-1] * (1 + props.rentalCostRate / 100));
    realtyMV.push(realtyMV[i-1] * (1 + props.realtyMVRate / 100));
    sunkCostBuy.push(sunkCostBuy[i-1] + annualTaxesCost[i] + interest[i]);
    sunkCostRent.push(sunkCostRent[i-1] + annualRentalCost[i]);
    liquidationValue.push(realtyMV[i] - principal[i]);
    sunkCostDelta.push(sunkCostRent[i] - sunkCostBuy[i] + liquidationValue[i]);
  };

  const getYearData = (year: number): React.JSX.Element => {
    const isNegative = sunkCostDelta[year] < 0;

    return (
      <TableRow key={year}>
        <TableCell>{years[year]}</TableCell>
        <TableCell sx={{
          color: isNegative ? 'error.main' : 'success.main',
          fontWeight: 'bold'
        }}>
          {sunkCostDelta[year].toFixed(0)}
        </TableCell>
        <TableCell>{sunkCostBuy[year].toFixed(0)}</TableCell>
        <TableCell>{sunkCostRent[year].toFixed(0)}</TableCell>
        <TableCell>{realtyMV[year].toFixed(0)}</TableCell>
        <TableCell>{annualRentalCost[year].toFixed(0)}</TableCell>
        <TableCell>{interest[year].toFixed(0)}</TableCell>
        <TableCell>{principal[year].toFixed(0)}</TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <Box sx={{ mb: 4, mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="primary">
                Annual rent payment: {annualPaymentAmount.toFixed(0)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="primary">
                Acquisition initial sunk costs: {(realtyMV[0] - props.acquisitionCost).toFixed(0)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <TableContainer component={Paper} sx={{ 
          elevation: 3,
          '& .MuiTableCell-head': {
            backgroundColor: 'primary.main',
            color: 'white',
            fontWeight: 'bold'
          },
          '& .MuiTableCell-body': {
            fontSize: '1rem'
          }
        }}>
          <MuiTable size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell>Buy equity</TableCell>
                <TableCell>Sunk buy</TableCell>
                <TableCell>Sunk rent</TableCell>
                <TableCell>Realty market value</TableCell>
                <TableCell>Annual rent cost</TableCell>
                <TableCell>Loan interest</TableCell>
                <TableCell>Loan principal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {years.map((_, i) => getYearData(i))}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </Box>
    </>
  )
}

export default Table