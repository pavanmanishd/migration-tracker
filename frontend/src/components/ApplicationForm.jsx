import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { addApplication, initializeApplication } from "../services/api";

const ApplicationForm = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [eaiCode, setEaiCode] = useState("");
  const [applicationName, setApplicationName] = useState("");
  const [owner, setOwner] = useState("");
  const [target, setTarget] = useState("");
  const [isCritical, setIsCritical] = useState(false);
  const [isAE, setIsAE] = useState(false);
  const [isExternal, setIsExternal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (!eaiCode || !applicationName || !owner) return;

    setLoading(true);
    try {
      await addApplication({ eaiCode, applicationName, owner, target, isCritical, isAE, isExternal });
      await initializeApplication(eaiCode, owner);
      setEaiCode("");
      setApplicationName("");
      setOwner("");
      setTarget("");
      setIsCritical(false);
      setIsAE(false);
      setIsExternal(false);
      handleClose();
      onSuccess();
    } catch (error) {
      console.error("Failed to add application:", error);
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
            label="Application Name"
            fullWidth
            value={applicationName}
            onChange={(e) => setApplicationName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Owner"
            fullWidth
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Target"
            fullWidth
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Is Critical</InputLabel>
            <Select
              value={isCritical}
              onChange={(e) => setIsCritical(e.target.value)}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Is AE</InputLabel>
            <Select
              value={isAE}
              onChange={(e) => setIsAE(e.target.value)}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Is External</InputLabel>
            <Select
              value={isExternal}
              onChange={(e) => setIsExternal(e.target.value)}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={loading || !eaiCode || !applicationName || !owner}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApplicationForm;
