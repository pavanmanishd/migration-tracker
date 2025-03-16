import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MigrationTable from "../components/MigrationTable";
import {
  getApplicationDetails,
  getApplicationByEaiCode,
} from "../services/api";

const ApplicationPage = () => {
  const { eaiCode } = useParams();
  const navigate = useNavigate();
  const [migrationItems, setMigrationItems] = useState([]);
  const [applicationDetails, setApplicationDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadApplicationData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [details, data] = await Promise.all([
        getApplicationByEaiCode(eaiCode),
        getApplicationDetails(eaiCode),
      ]);
      setApplicationDetails(details);
      setMigrationItems(data);
      if (data.length === 0) {
        setError("No migration data found for this EAI code");
      }
    } catch (error) {
      console.error("Failed to load application data:", error);
      setError("Failed to load application data. The EAI code may not exist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplicationData();
  }, [eaiCode]);

  const handleItemUpdated = (updatedItem) => {
    setMigrationItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleBack = () => {
    navigate("/");
  };

  const calculateProgress = () => {
    if (!migrationItems.length) return 0;
    const completed = migrationItems.filter(
      (item) => item.status === "COMPLETED"
    ).length;
    return (completed / migrationItems.length) * 100;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box mb={3} display="flex" alignItems="center">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" component="h1">
          Application: {eaiCode}
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" p={5}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="warning">{error}</Alert>
      ) : (
        <>
          {applicationDetails && (
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Application Details
              </Typography>
              <Typography>
                <strong>Name:</strong> {applicationDetails.applicationName}
              </Typography>
              <Typography>
                <strong>Owner:</strong> {applicationDetails.owner}
              </Typography>
              <Typography>
                <strong>Target:</strong> {applicationDetails.target}
              </Typography>
              <Typography>
                <strong>Is Critical App:</strong> {applicationDetails.isCritical ? "Yes" : "No"}
              </Typography>
              <Typography>
                <strong>Is AE App:</strong> {applicationDetails.isAE ? "Yes" : "No"}
              </Typography>
              <Typography>
                <strong>Is External App:</strong> {applicationDetails.isExternal ? "Yes" : "No"}
              </Typography>
              <Typography>
                <strong>Last Updated:</strong> {new Date(applicationDetails.lastUpdated).toLocaleString()}
              </Typography>
            </Paper>
          )}

          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Migration Progress
            </Typography>
            <Box display="flex" alignItems="center">
              <Box sx={{ position: "relative", width: "100%", mr: 2 }}>
                <Box
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: "background.paper",
                    border: "1px solid #ddd",
                  }}
                />
                <Box
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: "primary.main",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${calculateProgress()}%`,
                  }}
                />
              </Box>
              <Typography variant="body2">
                {Math.round(calculateProgress())}%
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography>
                {
                  migrationItems.filter((item) => item.status === "COMPLETED")
                    .length
                }{" "}
                of {migrationItems.length} items completed
              </Typography>
            </Box>
          </Paper>

          <MigrationTable
            items={migrationItems}
            onItemUpdated={handleItemUpdated}
          />
        </>
      )}
    </Container>
  );
};

export default ApplicationPage;
