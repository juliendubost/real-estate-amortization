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
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  borderRadius: 8,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0px 8px 12px -3px rgba(0,0,0,0.1), 0px 4px 6px -2px rgba(0,0,0,0.05)',
  },
}));

const StatCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: React.ElementType }) => (
  <StyledCard>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Icon sx={{ color: 'primary.main', mr: 1 }} />
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h5" color="text.primary" fontWeight="600">
        {value}
      </Typography>
    </CardContent>
  </StyledCard>
);

const Table = (props: InputProps): React.JSX.Element => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: isSmallScreen ? 0 : 2,
      notation: isSmallScreen ? 'compact' : 'standard'
    }).format(value);
  };

  const getYearData = (year: number): React.JSX.Element => {
    const isNegative = sunkCostDelta[year] < 0;

    return (
      <TableRow 
        key={year}
        sx={{
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.grey[50],
          },
          '&:hover': {
            backgroundColor: theme.palette.grey[100],
          },
          transition: 'background-color 0.2s ease-in-out',
        }}
      >
        <TableCell>{years[year]}</TableCell>
        <TableCell sx={{
          color: isNegative ? theme.palette.error.main : theme.palette.success.main,
          fontWeight: 600,
        }}>
          {formatCurrency(sunkCostDelta[year])}
        </TableCell>
        <TableCell>{formatCurrency(sunkCostBuy[year])}</TableCell>
        <TableCell>{formatCurrency(sunkCostRent[year])}</TableCell>
        <TableCell>{formatCurrency(realtyMV[year])}</TableCell>
        <TableCell>{formatCurrency(annualRentalCost[year])}</TableCell>
        <TableCell>{formatCurrency(interest[year])}</TableCell>
        <TableCell>{formatCurrency(principal[year])}</TableCell>
      </TableRow>
    );
  };

  const tableHeaders = [
    { id: 'year', label: 'Year', tooltip: 'Year number', width: '7%' },
    { id: 'equity', label: 'Net Position', tooltip: 'Buy vs. Rent Financial Position', width: '15%' },
    { id: 'buyCost', label: 'Buy Cost', tooltip: 'Total Cost of Buying', width: '13%' },
    { id: 'rentCost', label: 'Rent Cost', tooltip: 'Total Cost of Renting', width: '13%' },
    { id: 'value', label: 'Property Value', tooltip: 'Current Property Market Value', width: '13%' },
    { id: 'rent', label: 'Annual Rent', tooltip: 'Yearly Rental Cost', width: '13%' },
    { id: 'interest', label: 'Interest', tooltip: 'Yearly Loan Interest', width: '13%' },
    { id: 'principal', label: 'Principal', tooltip: 'Remaining Loan Principal', width: '13%' },
  ];

  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <StatCard
            title="Annual Loan Payment"
            value={formatCurrency(annualPaymentAmount)}
            icon={TrendingUpIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StatCard
            title="Initial Investment"
            value={formatCurrency(realtyMV[0] - props.acquisitionCost)}
            icon={AccountBalanceWalletIcon}
          />
        </Grid>
      </Grid>

      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 0,
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'grey.200',
          overflow: 'auto',
          maxHeight: '70vh',
          '& .MuiTableCell-head': {
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.text.primary,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            padding: theme.spacing(1.5),
            fontSize: '0.875rem',
            borderBottom: `2px solid ${theme.palette.grey[300]}`,
            position: 'sticky',
            top: 0,
            zIndex: 1,
          },
          '& .MuiTableCell-body': {
            padding: theme.spacing(1.5),
            fontSize: '0.875rem',
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
            whiteSpace: 'nowrap',
          },
          '& .MuiTableRow-root:last-child .MuiTableCell-body': {
            borderBottom: 'none',
          },
        }}
      >
        <MuiTable size={isSmallScreen ? "small" : "medium"} sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header) => (
                <Tooltip 
                  key={header.id} 
                  title={header.tooltip} 
                  arrow 
                  placement="top"
                  enterDelay={300}
                >
                  <TableCell 
                    sx={{ 
                      width: header.width,
                      textAlign: header.id === 'year' ? 'center' : 'right',
                      backgroundColor: theme.palette.grey[100],
                    }}
                  >
                    {header.label}
                  </TableCell>
                </Tooltip>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {years.map((_, i) => (
              <TableRow 
                key={i}
                sx={{
                  '&:nth-of-type(even)': {
                    backgroundColor: theme.palette.grey[50],
                  },
                  '&:hover': {
                    backgroundColor: `${theme.palette.primary.light}08`,
                  },
                  transition: 'background-color 0.2s ease-in-out',
                }}
              >
                <TableCell 
                  sx={{ 
                    textAlign: 'center',
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                  }}
                >
                  {years[i]}
                </TableCell>
                <TableCell 
                  sx={{
                    color: sunkCostDelta[i] < 0 ? theme.palette.error.main : theme.palette.success.main,
                    fontWeight: 600,
                    textAlign: 'right',
                    backgroundColor: sunkCostDelta[i] < 0 
                      ? `${theme.palette.error.main}08`
                      : `${theme.palette.success.main}08`,
                  }}
                >
                  {formatCurrency(sunkCostDelta[i])}
                </TableCell>
                {[
                  sunkCostBuy[i],
                  sunkCostRent[i],
                  realtyMV[i],
                  annualRentalCost[i],
                  interest[i],
                  principal[i]
                ].map((value, index) => (
                  <TableCell 
                    key={index}
                    sx={{ 
                      textAlign: 'right',
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {formatCurrency(value)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Box>
  );
}

export default Table;