import { Chip } from "@mui/material";

const StatusBadge = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case "DONE":
        return "success";
      case "WIP":
        return "primary";
      case "TBD":
        return "default";
      default:
        return "default";
    }
  };

  return <Chip label={status} color={getColor()} />;
};

export default StatusBadge;
