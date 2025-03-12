import React, { useState, useMemo } from 'react';
import Input from './Input';
import { ThemeProvider, createTheme, CssBaseline, Container, Box, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const App: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#2563eb' : '#60a5fa',
        light: mode === 'light' ? '#60a5fa' : '#93c5fd',
        dark: mode === 'light' ? '#1d4ed8' : '#2563eb',
        contrastText: '#ffffff',
      },
      secondary: {
        main: mode === 'light' ? '#7c3aed' : '#a78bfa',
        light: mode === 'light' ? '#a78bfa' : '#c4b5fd',
        dark: mode === 'light' ? '#5b21b6' : '#7c3aed',
        contrastText: '#ffffff',
      },
      background: {
        default: mode === 'light' ? '#f8fafc' : '#0f172a',
        paper: mode === 'light' ? '#ffffff' : '#1e293b',
      },
      text: {
        primary: mode === 'light' ? '#1e293b' : '#f1f5f9',
        secondary: mode === 'light' ? '#64748b' : '#94a3b8',
      },
      error: {
        main: mode === 'light' ? '#ef4444' : '#f87171',
        light: mode === 'light' ? '#fca5a5' : '#fca5a5',
        dark: mode === 'light' ? '#b91c1c' : '#ef4444',
      },
      success: {
        main: mode === 'light' ? '#22c55e' : '#4ade80',
        light: mode === 'light' ? '#86efac' : '#86efac',
        dark: mode === 'light' ? '#15803d' : '#22c55e',
      },
      grey: {
        50: mode === 'light' ? '#f8fafc' : '#0f172a',
        100: mode === 'light' ? '#f1f5f9' : '#1e293b',
        200: mode === 'light' ? '#e2e8f0' : '#334155',
        300: mode === 'light' ? '#cbd5e1' : '#475569',
        400: mode === 'light' ? '#94a3b8' : '#64748b',
        500: mode === 'light' ? '#64748b' : '#94a3b8',
        600: mode === 'light' ? '#475569' : '#cbd5e1',
        700: mode === 'light' ? '#334155' : '#e2e8f0',
        800: mode === 'light' ? '#1e293b' : '#f1f5f9',
        900: mode === 'light' ? '#0f172a' : '#f8fafc',
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 8,
            padding: '0.5rem 1.5rem',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 6px -1px rgba(0,0,0,0.1)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'light' 
              ? '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)'
              : '0px 4px 6px -1px rgba(0,0,0,0.2), 0px 2px 4px -1px rgba(0,0,0,0.12)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'light'
              ? '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)'
              : '0px 4px 6px -1px rgba(0,0,0,0.2), 0px 2px 4px -1px rgba(0,0,0,0.12)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              '&:hover fieldset': {
                borderColor: mode === 'light' ? '#60a5fa' : '#93c5fd',
              },
              '& input[type=number]': {
                MozAppearance: 'textfield',
                '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
              },
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            '&[type=number]': {
              textAlign: 'right',
              paddingRight: '4px',
            },
          },
        },
      },
    },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 4,
      }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton 
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} 
              color="inherit"
              sx={{ 
                bgcolor: 'background.paper',
                '&:hover': {
                  bgcolor: mode === 'light' ? 'grey.100' : 'grey.800',
                },
              }}
            >
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Box>
          <Input />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
