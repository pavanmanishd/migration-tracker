import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}>
          MetLife Migration Tracker
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;