import Backdrop from "@mui/material/Backdrop";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton, Modal, Stack, Typography, Box } from "@mui/material";

const style = {
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  position: "absolute",
  maxWidth: 400,
  boxShadow: 0,
  width: "90%",
  left: "50%",
  top: "50%",
};

const AppModal = ({
  title = "",
  descripiton = "",
  actions = null,
  open = false,
  setOpen = () => {},
  modalStyle = {},
}) => {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        slots={{ backdrop: Backdrop }}
        onClose={handleClose}
        closeAfterTransition
        open={open}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box sx={{ ...style, ...modalStyle }}>
          <Box display={"flex"} justifyContent={"space-between"} p={1.2}>
            <Typography variant="h4" noWrap>
              {title || "Modal Title"}
            </Typography>
            <IconButton
              onClick={handleClose}
              sx={{ p: 0 }}
              size="medium"
              disableRipple
            >
              <CancelIcon />
            </IconButton>
          </Box>
          {descripiton && (
            <Box minHeight={200} maxHeight={500} overflowY={"auto"} p={2}>
              <Typography variant="body1">{descripiton}</Typography>
            </Box>
          )}
          {actions && (
            <Stack
              spacing={{ xs: 1, sm: 1.2 }}
              justifyContent={"center"}
              alignItems={"stretch"}
              direction="row"
              useFlexGap
              p={1.2}
            >
              {actions}
            </Stack>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AppModal;
