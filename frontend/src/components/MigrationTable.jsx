import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ButtonGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StatusBadge from "./StatusBadge";
import { updateMigrationItem } from "../services/api";

const MigrationTable = ({ items, onItemUpdated }) => {
  const [editItem, setEditItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [comments, setComments] = useState("");
  const [username, setUsername] = useState("");
  const [activity, setActivity] = useState("");
  const [teamGroup, setTeamGroup] = useState("");
  const [plannedDate, setPlannedDate] = useState("");
  const [completedOn, setCompletedOn] = useState("");
  const [tickets, setTickets] = useState("");
  
  // New state for component selection and expanded environments
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [expandedEnvironments, setExpandedEnvironments] = useState([]);

  // Get unique components from items
  const components = [...new Set(items.map(item => item.component))];
  
  // Get unique environments
  const environments = [...new Set(items.map(item => item.environment))];

  const handleEditClick = (item) => {
    setEditItem(item);
    setUpdatedStatus(item.status);
    setComments(item.comments || "");
    setUsername(item.updatedBy || "");
    setActivity(item.activity || "");
    setTeamGroup(item.teamGroup || "");
    setPlannedDate(item.plannedDate || "");
    setCompletedOn(item.completedOn || "");
    setTickets(item.tickets || "");
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setEditItem(null);
  };

  const handleUpdate = async () => {
    if (!editItem) return;

    try {
      const updatedItem = await updateMigrationItem(editItem.id, {
        status: updatedStatus,
        comments: comments,
        updatedBy: username,
        activity: activity,
        teamGroup: teamGroup,
        plannedDate: plannedDate,
        completedOn: completedOn,
        tickets: tickets,
      });
      onItemUpdated(updatedItem);
      handleClose();
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
    // If no environments are expanded yet, expand the first one
    if (expandedEnvironments.length === 0 && environments.length > 0) {
      setExpandedEnvironments([environments[0]]);
    }
  };

  const handleEnvironmentToggle = (env) => {
    setExpandedEnvironments(prevExpanded => 
      prevExpanded.includes(env)
        ? prevExpanded.filter(e => e !== env)
        : [...prevExpanded, env]
    );
  };

  // Get items for a specific component and environment
  const getItemsByComponentAndEnvironment = (component, env) => {
    return items.filter(item => 
      item.component === component && 
      item.environment === env
    );
  };

  const isEnvironmentExpanded = (env) => {
    return expandedEnvironments.includes(env);
  };

  return (
    <>
      {/* Component selection buttons */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Select Component:
        </Typography>
        <ButtonGroup variant="outlined" size="large" sx={{ mb: 2 }}>
          {components.map(component => (
            <Button 
              key={component}
              onClick={() => handleComponentSelect(component)}
              variant={selectedComponent === component ? "contained" : "outlined"}
              color={selectedComponent === component ? "primary" : "inherit"}
            >
              {component}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {/* Environment accordions (only if a component is selected) */}
      {selectedComponent && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Environments for {selectedComponent}:
          </Typography>
          
          {environments.map(env => (
            <Accordion 
              key={env}
              expanded={isEnvironmentExpanded(env)}
              onChange={() => handleEnvironmentToggle(env)}
              sx={{ mb: 2 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {env}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Activity</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Team/Group</TableCell>
                        <TableCell>Planned Date</TableCell>
                        <TableCell>Completed On</TableCell>
                        <TableCell>Tickets</TableCell>
                        <TableCell>Comments</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getItemsByComponentAndEnvironment(selectedComponent, env).map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.activity}</TableCell>
                          <TableCell>
                              <StatusBadge status={item.status || "TBD"} />
                          </TableCell>
                          <TableCell>{item.teamGroup || "-"}</TableCell>
                          <TableCell>
                            {item.plannedDate
                              ? new Date(item.plannedDate).toLocaleString()
                              : "-"}
                          </TableCell>
                          <TableCell>
                            {item.completedOn
                              ? new Date(item.completedOn).toLocaleString()
                              : "-"}
                          </TableCell>
                          <TableCell>{item.tickets || "-"}</TableCell>
                          <TableCell>{item.comments || "-"}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleEditClick(item)}
                            >
                              Update
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}

      {/* Edit dialog - remains mostly unchanged */}
      <Dialog open={dialogOpen} onClose={handleClose} fullWidth>
        <DialogTitle>Update Migration Activity</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={updatedStatus}
              label="Status"
              onChange={(e) => setUpdatedStatus(e.target.value)}
            >
              <MenuItem value="DONE">DONE</MenuItem>
              <MenuItem value="WIP">WIP</MenuItem>
              <MenuItem value="TBD">TBD</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Activity"
            fullWidth
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Team/Group"
            fullWidth
            value={teamGroup}
            onChange={(e) => setTeamGroup(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Planned Date"
            fullWidth
            type="datetime-local"
            value={plannedDate}
            onChange={(e) => setPlannedDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Completed On"
            fullWidth
            type="datetime-local"
            value={completedOn}
            onChange={(e) => setCompletedOn(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Tickets"
            fullWidth
            value={tickets}
            onChange={(e) => setTickets(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Comments"
            fullWidth
            multiline
            rows={4}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary" disabled={!username}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MigrationTable;