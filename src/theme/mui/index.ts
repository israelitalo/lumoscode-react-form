import { createTheme } from '@mui/material/styles';
import { colors } from '../colors';

const rootMuiInputs = {
  root: {
    '& .MuiInputBase-input.Mui-disabled': {
      opacity: 0.3,
    },
  },
};

export const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          textTransform: 'unset',
        },
      },
    },
    MuiInputBase: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          padding: '0px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        ...rootMuiInputs,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        ...rootMuiInputs,
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small',
        disableRipple: true,
      },
    },
    MuiMenuItem: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.white,
        },
      },
    },
    MuiTab: {
      defaultProps: {
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'unset',
          minHeight: 20,
        },
      },
    },
  },
  palette: {
    primary: {
      main: colors.primary,
      contrastText: colors.contrastText,
    },
    secondary: {
      main: colors.secondary,
      contrastText: colors.contrastText,
    },
    text: {
      primary: colors.text,
      secondary: colors.text,
      disabled: colors.disabled,
    },
    error: {
      main: colors.error,
      contrastText: colors.contrastText,
    },
    success: {
      main: colors.success,
      contrastText: colors.contrastText,
    },
    background: {
      default: colors.text,
      paper: colors.white,
    },
  },
  typography: {
    htmlFontSize: 15,
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
