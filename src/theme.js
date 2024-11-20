import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins', 
    fontSize: 15, 
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

export default theme;