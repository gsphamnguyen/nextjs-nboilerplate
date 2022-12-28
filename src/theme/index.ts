import { createTheme } from '@mui/material/styles';
import { Montserrat } from '@next/font/google';

export const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
  variable: '--font-montserrat',
});

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
});

export default theme;
