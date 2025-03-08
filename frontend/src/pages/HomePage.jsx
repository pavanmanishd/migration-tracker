import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  List, 
  ListItem,
  ListItemText,
  Paper,
  Grid,
  Box,
  CircularProgress,
  Autocomplete
} from '@mui/material';
import { getAllEaiCodes } from '../services/api';
import ApplicationForm from '../components/ApplicationForm';

const HomePage = () => {
  const navigate = useNavigate();
  const [eaiCodes, setEaiCodes] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [fuse, setFuse] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const loadEaiCodes = async () => {
    try {
      setLoading(true);
      const codes = await getAllEaiCodes();
      setEaiCodes(codes);
      
      // Initialize Fuse instance for fuzzy searching
      const fuseInstance = new Fuse(codes, {
        threshold: 0.4,
        distance: 100,
      });
      setFuse(fuseInstance);
    } catch (error) {
      console.error('Failed to load EAI codes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEaiCodes();
  }, []);

  // Update search results when input changes
  useEffect(() => {
    if (fuse && searchInput) {
      const results = fuse.search(searchInput).map(result => result.item);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchInput, fuse]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/${searchInput.trim()}`);
    }
  };

  const handleCodeClick = (code) => {
    navigate(`/${code}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Migration Tracker
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Find Application
        </Typography>
        <Grid container spacing={2} component="form" onSubmit={handleSearch}>
          <Grid item xs={8}>
            <Autocomplete
              freeSolo
              options={searchResults.length > 0 ? searchResults : eaiCodes}
              inputValue={searchInput}
              onInputChange={(_, newValue) => setSearchInput(newValue)}
              onChange={(_, value) => {
                if (value) {
                  navigate(`/${value}`);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Enter EAI Code"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={4} display="flex" alignItems="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!searchInput.trim()}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Existing Applications</Typography>
        <ApplicationForm onSuccess={loadEaiCodes} />
      </Box>
      
      <Paper>
        {loading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : eaiCodes.length > 0 ? (
          <List>
            {eaiCodes.map((code) => (
              <ListItem 
                key={code} 
                button 
                onClick={() => handleCodeClick(code)}
                divider
              >
                <ListItemText primary={code} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box p={3} textAlign="center">
            <Typography color="textSecondary">
              No applications found. Create your first application to get started.
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default HomePage;