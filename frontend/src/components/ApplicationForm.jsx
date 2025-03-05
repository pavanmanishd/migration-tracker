import { useState } from 'react';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField 
} from '@mui/material';
import { initializeApplication } from '../services/api';

const ApplicationForm = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [eaiCode, setEaiCode] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (!eaiCode || !username) return;
    
    setLoading(true);
    try {
      await initializeApplication(eaiCode, username);
      setEaiCode('');
      setUsername('');
      handleClose();
      onSuccess();
    } catch (error) {
      console.error('Failed to initialize application:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create New Application
      </Button>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Initialize New Application</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="EAI Code"
            fullWidth
            value={eaiCode}
            onChange={(e) => setEaiCode(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary" disabled={loading || !eaiCode || !username}>
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApplicationForm;