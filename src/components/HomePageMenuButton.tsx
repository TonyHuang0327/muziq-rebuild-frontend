import { Button, keyframes, Typography } from "@mui/material";
type HomePageMenuButtonProps = {
  onClick: () => void;
  text: string;
};
const buttonFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const BUTTON_PIXEL_SHADOW =
  "1px 1px 0 0 #b2241e,2px 2px 0 0 #b2241e,3px 3px 0 0 #b2241e,4px 4px 0 0 #b2241e,5px 5px 0 0 #b2241e";

const menuButtonFloatSx = {
  py: 1.5,
  width: "60%",
  maxWidth: "400px",
  boxShadow: BUTTON_PIXEL_SHADOW,
  animation: `${buttonFloat} 2s ease-in-out infinite`,
  "@media (prefers-reduced-motion: reduce)": {
    animation: "none",
  },
} as const;

export const HomePageMenuButton = ({
  onClick,
  text,
}: HomePageMenuButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={menuButtonFloatSx}
    >
      <Typography variant="h6">{text}</Typography>
    </Button>
  );
};
