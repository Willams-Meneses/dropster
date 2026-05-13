import { createTheme } from '@mui/material/styles';
import { colors } from './palette';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.brand.orange,
      light: colors.brand.orangeLight,
      dark: colors.brand.orangeDark,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.green.main,
      light: colors.green.light,
      dark: colors.green.dark,
      contrastText: colors.white,
    },
    success: {
      main: colors.status.success,
      contrastText: colors.white,
    },
    warning: {
      main: colors.status.warning,
      contrastText: colors.white,
    },
    error: {
      main: colors.status.error,
      contrastText: colors.white,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled,
    },
    background: {
      default: colors.white,
      paper: colors.white,
    },
    divider: colors.neutral[300],
    grey: colors.neutral,
  },

  typography: {
    fontFamily: '"Poppins", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    h1: {
      fontSize: '32px',
      fontWeight: 600,
      lineHeight: '48px',
      color: colors.content.heading,
    },
    h2: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: '36px',
      color: colors.content.heading,
    },
    h3: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '30px',
      color: colors.content.heading,
    },
    h4: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '27px',
      color: colors.content.heading,
    },
    h5: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '24px',
      color: colors.content.heading,
    },
    h6: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '21px',
      color: colors.content.heading,
    },
    subtitle1: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: '18px',
      color: colors.content.strong,
    },
    subtitle2: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '18px',
      color: colors.content.strong,
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      color: colors.content.body,
    },
    body2: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: '16px',
      color: colors.content.strong,
    },
    caption: {
      fontSize: '9px',
      fontWeight: 400,
      lineHeight: '14.4px',
      color: colors.content.muted,
    },
    overline: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: '18px',
      textTransform: 'uppercase' as const,
      color: colors.content.heading,
    },
    button: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '24px',
      textTransform: 'none' as const,
    },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '100px',
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 28,
          paddingRight: 28,

          //TODO: si queremos sacar la opacidad en el outlined  es con boxShadow
          boxShadow: '2px 4px 16px 0 rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '2px 4px 16px 0 rgba(0, 0, 0, 0.12)',
          },
          '&.MuiButton-containedPrimary:hover': {
            backgroundColor: colors.brand.orangeDark,
          },

          '&.MuiButton-outlinedPrimary': {
            borderColor: colors.brand.orange,
            color: colors.brand.orange,
            '&:hover': {
              borderColor: colors.brand.orangeDark,
              color: colors.brand.orangeDark,
              backgroundColor: 'transparent',
            },
          },
          // TODO: si queremos aumetar el grosor del borde outlined es con variants
          variants: [
            {
              props: { variant: 'outlined', color: 'primary' },
              style: {
                borderWidth: '1.5px',
              },
            },
          ],
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: colors.neutral[300],
            },
            '&:hover fieldset': {
              borderColor: colors.neutral[400],
            },
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '& fieldset': {
            borderColor: colors.neutral[300],
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.white,
          color: colors.text.primary,
        },
      },
    },
  },
});

export default theme;