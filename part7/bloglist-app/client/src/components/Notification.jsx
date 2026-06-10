import { Alert } from "@mui/material";
import { useNotificationMessage, useNotificationType } from "../store";

const Notification = () => {
  const message = useNotificationMessage();
  const type = useNotificationType();

  if (!message) {
    return null;
  }

  return (
    <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={type}>
      {message}
    </Alert>
  );
};

export default Notification;
