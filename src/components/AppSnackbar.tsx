import { Alert, Snackbar } from "@mui/material";
import type { AlertColor } from "@mui/material";

interface AppSnackbarProps {
  message: string | null;
  onClose: () => void;
  severity?: AlertColor;
}

/** Transient feedback：Snackbar 包住 Alert，禁止在頁面單獨使用 Alert */
export const AppSnackbar = ({
  message,
  onClose,
  severity = "error",
}: AppSnackbarProps) => (
  <Snackbar
    open={Boolean(message)}
    autoHideDuration={6000}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
  >
    <Alert severity={severity} variant="filled" onClose={onClose}>
      {message}
    </Alert>
  </Snackbar>
);
