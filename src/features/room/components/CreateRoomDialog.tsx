import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import type { CreateRoomFormValues } from "../types/room";

const DEFAULT_FORM_VALUES: CreateRoomFormValues = {
  roomName: "",
  maxPlayers: 4,
  questionSeconds: 30,
  isPrivate: false,
};

type FormErrors = Partial<Record<keyof CreateRoomFormValues, string>>;

interface CreateRoomDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateRoomFormValues) => void;
}

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": { borderColor: "primary.main" },
    "&:hover fieldset": { borderColor: "accent.main" },
    "&.Mui-focused fieldset": { borderColor: "accent.main" },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.7)",
    "&.Mui-focused": { color: "primary.main" },
  },
} as const;

const validateForm = (values: CreateRoomFormValues): FormErrors => {
  const errors: FormErrors = {};
  const trimmedName = values.roomName.trim();

  if (!trimmedName) {
    errors.roomName = "請輸入房間名稱";
  } else if (trimmedName.length > 20) {
    errors.roomName = "房間名稱不可超過 20 字";
  }

  if (!Number.isInteger(values.maxPlayers) || values.maxPlayers < 2 || values.maxPlayers > 8) {
    errors.maxPlayers = "房間人數須為 2 至 8 的整數";
  }

  if (
    !Number.isInteger(values.questionSeconds) ||
    values.questionSeconds < 10 ||
    values.questionSeconds > 120
  ) {
    errors.questionSeconds = "題目秒數須為 10 至 120 的整數";
  }

  return errors;
};

export const CreateRoomDialog = ({
  open,
  onClose,
  onSubmit,
}: CreateRoomDialogProps) => {
  const [formValues, setFormValues] =
    useState<CreateRoomFormValues>(DEFAULT_FORM_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});

  const resetForm = () => {
    setFormValues(DEFAULT_FORM_VALUES);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    const validationErrors = validateForm(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...formValues,
      roomName: formValues.roomName.trim(),
    });
    resetForm();
    onClose();
  };

  const updateField = <K extends keyof CreateRoomFormValues>(
    field: K,
    value: CreateRoomFormValues[K],
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            bgcolor: "background.default",
            border: "2px solid",
            borderColor: "primary.main",
            borderRadius: 0,
          },
        },
      }}
    >
      <DialogTitle sx={{ color: "primary.main", fontWeight: "bold" }}>
        創建房間
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2.5} sx={{ pt: 1 }}>
          <TextField
            label="房間名稱"
            fullWidth
            value={formValues.roomName}
            onChange={(e) => updateField("roomName", e.target.value)}
            error={!!errors.roomName}
            helperText={errors.roomName}
            sx={textFieldSx}
          />
          <TextField
            label="房間人數"
            type="number"
            fullWidth
            value={formValues.maxPlayers}
            onChange={(e) =>
              updateField("maxPlayers", Number(e.target.value))
            }
            error={!!errors.maxPlayers}
            helperText={errors.maxPlayers ?? "2 至 8 人"}
            slotProps={{ htmlInput: { min: 2, max: 8 } }}
            sx={textFieldSx}
          />
          <TextField
            label="題目秒數"
            type="number"
            fullWidth
            value={formValues.questionSeconds}
            onChange={(e) =>
              updateField("questionSeconds", Number(e.target.value))
            }
            error={!!errors.questionSeconds}
            helperText={errors.questionSeconds ?? "10 至 120 秒"}
            slotProps={{ htmlInput: { min: 10, max: 120 } }}
            sx={textFieldSx}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formValues.isPrivate}
                onChange={(e) => updateField("isPrivate", e.target.checked)}
                color="primary"
              />
            }
            label="私人房間"
            sx={{ color: "white" }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} sx={{ color: "white" }}>
          取消
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          建立
        </Button>
      </DialogActions>
    </Dialog>
  );
};
