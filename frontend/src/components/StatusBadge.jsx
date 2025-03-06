import { Chip } from "@mui/material";

const StatusBadge = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case "COMPLETED":
      case "DONE":
        return "success";
      case "IN_PROGRESS":
      case "WIP":
        return "primary";
      case "FAILED":
        return "error";
      case "TBD":
        return "default";
      default:
        return "default";
    }
  };

  return <Chip label={status} color={getColor()} />;
};

export default StatusBadge;
