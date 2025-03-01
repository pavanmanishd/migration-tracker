import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ApplicationPage from './pages/ApplicationPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0061a9', // MetLife blue
    },
    secondary: {
      main: '#6eaee6',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:eaiCode" element={<ApplicationPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;