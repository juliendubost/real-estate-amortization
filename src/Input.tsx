import React, { useState } from 'react'
import Table from './Table'
import { 
  TextField, 
  Container, 
  Paper, 
  Typography, 
  Grid,
  Box,
  InputAdornment,
  IconButton,
  ButtonGroup,
  StandardTextFieldProps,
  OutlinedTextFieldProps,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

type NumberInputProps = {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step?: number;
  adornment?: string;
};

const NumberInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  step = 1, 
  adornment,
}: NumberInputProps) => {
  const handleIncrease = () => {
    onChange({
      target: { name, value: String(Number(value) + step) }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleDecrease = () => {
    onChange({
      target: { name, value: String(Number(value) - step) }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <TextField
      size="small"
      fullWidth
      label={`${label}${adornment ? ` (${adornment})` : ''}`}
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <ButtonGroup
              orientation="vertical"
              size="small"
              sx={{
                height: '100%',
                '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                  borderBottom: '1px solid',
                  borderBottomColor: 'grey.300',
                },
              }}
            >
              <IconButton
                onClick={handleIncrease}
                size="small"
                sx={{ 
                  borderRadius: 0,
                  height: '50%',
                  width: 24,
                  minWidth: 24,
                  padding: 0,
                }}
              >
                <AddIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton
                onClick={handleDecrease}
                size="small"
                sx={{ 
                  borderRadius: 0,
                  height: '50%',
                  width: 24,
                  minWidth: 24,
                  padding: 0,
                }}
              >
                <RemoveIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </ButtonGroup>
          </InputAdornment>
        ),
      } as Partial<OutlinedTextFieldProps['InputProps']>}
      sx={{
        '& .MuiOutlinedInput-root': {
          pr: 0,
        },
      }}
    />
  );
};

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
                  <NumberInput
                    label="Acquisition Cost"
                    name="acquisitionCost"
                    value={inputData.acquisitionCost}
                    onChange={handleChange}
                    step={1000}
                    adornment="€"
                  />
                </Grid>
                <Grid item xs={12}>
                  <NumberInput
                    label="Market Value"
                    name="realtyMV"
                    value={inputData.realtyMV}
                    onChange={handleChange}
                    step={1000}
                    adornment="€"
                  />
                </Grid>
                <Grid item xs={12}>
                  <NumberInput
                    label="Market Value Growth"
                    name="realtyMVRate"
                    value={inputData.realtyMVRate}
                    onChange={handleChange}
                    step={0.1}
                    adornment="%"
                  />
                </Grid>
                <Grid item xs={12}>
                  <NumberInput
                    label="Annual Owner Fee"
                    name="annualTaxes"
                    value={inputData.annualTaxes}
                    onChange={handleChange}
                    step={100}
                    adornment="€"
                  />
                </Grid>
                <Grid item xs={12}>
                  <NumberInput
                    label="Annual Owner Fee Growth"
                    name="annualTaxesRate"
                    value={inputData.annualTaxesRate}
                    onChange={handleChange}
                    step={0.1}
                    adornment="%"
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
                  <NumberInput
                    label="Loan Amount"
                    name="loan"
                    value={inputData.loan}
                    onChange={handleChange}
                    step={1000}
                    adornment="€"
                  />
                </Grid>
                <Grid item xs={12}>
                  <NumberInput
                    label="Interest Rate"
                    name="loanRate"
                    value={inputData.loanRate}
                    onChange={handleChange}
                    step={0.1}
                    adornment="%"
                  />
                </Grid>
                <Grid item xs={12}>
                  <NumberInput
                    label="Loan Term"
                    name="loanYears"
                    value={inputData.loanYears}
                    onChange={handleChange}
                    step={1}
                    adornment="years"
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
                  <NumberInput
                    label="Monthly Rent"
                    name="rentalCost"
                    value={inputData.rentalCost}
                    onChange={handleChange}
                    step={100}
                    adornment="€"
                  />
                </Grid>
                <Grid item xs={12}>
                  <NumberInput
                    label="Annual Rent Increase"
                    name="rentalCostRate"
                    value={inputData.rentalCostRate}
                    onChange={handleChange}
                    step={0.1}
                    adornment="%"
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
