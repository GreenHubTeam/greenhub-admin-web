"use client";

import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function ThemeClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}