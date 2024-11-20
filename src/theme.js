import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'sans-serif', 
    fontSize: 14, 
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

export default theme;