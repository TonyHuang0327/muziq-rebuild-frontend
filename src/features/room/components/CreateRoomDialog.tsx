import { useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  styled,
} from "@mui/material";
import { AppSnackbar } from "../../../components/AppSnackbar";
import type { CreateRoomFormValues } from "../types/room";

/** 題目秒數選項；0 代表不限時 */
const QUESTION_SECONDS_OPTIONS = [
  { value: 3, label: "3 秒" },
  { value: 5, label: "5 秒" },
  { value: 10, label: "10 秒" },
  { value: 0, label: "不限" },
] as const;

const ALLOWED_QUESTION_SECONDS = new Set<number>(
  QUESTION_SECONDS_OPTIONS.map((option) => option.value),
);

const DEFAULT_FORM_VALUES: CreateRoomFormValues = {
  roomName: "",
  maxPlayers: 4,
  questionSeconds: 10,
  isPrivate: false,
};

type FormErrors = Partial<Record<keyof CreateRoomFormValues, string>>;

interface CreateRoomDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateRoomFormValues) => Promise<void>;
  isSubmitting?: boolean;
  submitError?: string | null;
  onClearSubmitError?: () => void;
}

const RoomTextField = styled(TextField)({
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
});

const validateForm = (values: CreateRoomFormValues): FormErrors => {
  const errors: FormErrors = {};
  const trimmedName = values.roomName.trim();

  if (!trimmedName) {
    errors.roomName = "請輸入房間名稱";
  } else if (trimmedName.length > 20) {
    errors.roomName = "房間名稱不可超過 20 字";
  }

  if (
    !Number.isInteger(values.maxPlayers) ||
    values.maxPlayers < 2 ||
    values.maxPlayers > 8
  ) {
    errors.maxPlayers = "房間人數須為 2 至 8 的整數";
  }

  if (!ALLOWED_QUESTION_SECONDS.has(values.questionSeconds)) {
    errors.questionSeconds = "請選擇題目秒數";
  }

  return errors;
};

export const CreateRoomDialog = ({
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
  submitError = null,
  onClearSubmitError,
}: CreateRoomDialogProps) => {
  const [formValues, setFormValues] =
    useState<CreateRoomFormValues>(DEFAULT_FORM_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});

  const resetForm = () => {
    setFormValues(DEFAULT_FORM_VALUES);
    setErrors({});
  };

  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit({
        ...formValues,
        roomName: formValues.roomName.trim(),
      });
      resetForm();
      onClose();
    } catch {
      // 錯誤由 AppSnackbar（submitError）顯示，彈窗保持開啟
    }
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
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>創建房間</DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <RoomTextField
              label="房間名稱"
              fullWidth
              value={formValues.roomName}
              onChange={(e) => updateField("roomName", e.target.value)}
              error={!!errors.roomName}
              helperText={errors.roomName}
              disabled={isSubmitting}
            />
            <RoomTextField
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
              disabled={isSubmitting}
            />
            <FormControl
              error={!!errors.questionSeconds}
              disabled={isSubmitting}
            >
              <FormLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "primary.main" },
                }}
              >
                題目秒數
              </FormLabel>
              <RadioGroup
                row
                value={formValues.questionSeconds}
                onChange={(e) =>
                  updateField("questionSeconds", Number(e.target.value))
                }
              >
                {QUESTION_SECONDS_OPTIONS.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio color="primary" />}
                    label={option.label}
                    sx={{ color: "white" }}
                  />
                ))}
              </RadioGroup>
              {errors.questionSeconds && (
                <FormHelperText>{errors.questionSeconds}</FormHelperText>
              )}
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={formValues.isPrivate}
                  onChange={(e) => updateField("isPrivate", e.target.checked)}
                  color="primary"
                  disabled={isSubmitting}
                />
              }
              label="私人房間"
              sx={{ color: "white" }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleClose}
            disabled={isSubmitting}
            sx={{ color: "white" }}
          >
            取消
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={16} color="inherit" />
              ) : undefined
            }
          >
            建立
          </Button>
        </DialogActions>
      </Dialog>
      <AppSnackbar
        message={submitError}
        onClose={onClearSubmitError ?? (() => undefined)}
      />
    </>
  );
};
