import React, { useState } from 'react'
import Table from './Table'
import { 
  TextField, 
  Container, 
  Paper, 
  Typography, 
  Grid,
  Box
} from '@mui/material'

export interface InputProps {
  acquisitionCost: number;  // total acquisition cost, taxes included
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
      setInputData(prevData => ({...prevData, [name]: Number(value)}))
    }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <Box sx={{ my: 2 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Realty
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Acquisition cost"
                    type="number"
                    name="acquisitionCost"
                    value={inputData.acquisitionCost}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Market value"
                    type="number"
                    name="realtyMV"
                    value={inputData.realtyMV}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Market value growth"
                    type="number"
                    name="realtyMVRate"
                    value={inputData.realtyMVRate}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Annual owner fee"
                    type="number"
                    name="annualTaxes"
                    value={inputData.annualTaxes}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Annual owner fee growth rate"
                    type="number"
                    name="annualTaxesRate"
                    value={inputData.annualTaxesRate}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Loan
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Loan amount"
                    type="number"
                    name="loan"
                    value={inputData.loan}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Loan rate"
                    type="number"
                    name="loanRate"
                    value={inputData.loanRate}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Loan years"
                    type="number"
                    name="loanYears"
                    value={inputData.loanYears}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Rent
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Rental cost"
                    type="number"
                    name="rentalCost"
                    value={inputData.rentalCost}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Rental cost rate"
                    type="number"
                    name="rentalCostRate"
                    value={inputData.rentalCostRate}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Box sx={{ my: 2 }}>
            <Table {...inputData} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Input;
