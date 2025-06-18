import { useState } from "react";
import { useNotifications } from "./Notification.service";
import { Box, Button, Modal, Typography } from "@mui/material";

export default function NotificationModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [modalFn, setModalFn] = useState(() => {});
  const { permission, subscribe } = useNotifications();

  const toggleOpen = () => setOpen(!false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60dvw",
    bgcolor: "background.paper",
    p: 4,
  };

  console.log(permission);

  if (permission == "default") {
    setTitle("Notifications désactivées");
    setMessage(
      "Les notifications ne sont pas activé sur votre appareil. Activez les pour recevoir les notifications. "
    );
    setModalFn(subscribe);
    setOpen(true);
  }

  if (permission == "denied") {
  }

  return (
    <Modal open={open} onClose={toggleOpen}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Button onClick={() => modalFn}>Click </Button>
      </Box>
    </Modal>
  );
}
