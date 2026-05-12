// import { createTheme } from '@mui/material/styles';
// import { colors } from './palette';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: colors.brand.orange,
//       light: colors.brand.orangeLight,
//       dark: colors.brand.orangeDark,
//       contrastText: colors.white,
//     },
//     secondary: {
//       main: colors.green.main,
//       light: colors.green.light,
//       dark: colors.green.dark,
//       contrastText: colors.white,
//     },
//     success: {
//       main: colors.status.success,
//       contrastText: colors.white,
//     },
//     warning: {
//       main: colors.status.warning,
//       contrastText: colors.white,
//     },
//     error: {
//       main: colors.status.error,
//       contrastText: colors.white,
//     },
//     text: {
//       primary: colors.text.primary,
//       secondary: colors.text.secondary,
//       disabled: colors.text.disabled,
//     },
//     background: {
//       default: colors.white,
//       paper: colors.white,
//     },
//     divider: colors.neutral[300],
//     grey: colors.neutral,
//   },

//   typography: {
//     fontFamily: '"Nunito", "Poppins", "DM Sans", sans-serif',
//     fontWeightLight: 300,
//     fontWeightRegular: 400,
//     fontWeightMedium: 500,
//     fontWeightBold: 700,

//     h1: {
//       fontSize: '2.25rem',     // ~36px
//       fontWeight: 700,
//       lineHeight: 1.2,
//       letterSpacing: '-0.01em',
//     },
//     h2: {
//       fontSize: '1.75rem',     // ~28px
//       fontWeight: 700,
//       lineHeight: 1.25,
//       letterSpacing: '-0.005em',
//     },
//     h3: {
//       fontSize: '1.5rem',      // ~24px
//       fontWeight: 600,
//       lineHeight: 1.3,
//     },
//     h4: {
//       fontSize: '1.25rem',     // ~20px
//       fontWeight: 600,
//       lineHeight: 1.35,
//     },
//     h5: {
//       fontSize: '1.125rem',    // ~18px
//       fontWeight: 600,
//       lineHeight: 1.4,
//     },
//     h6: {
//       fontSize: '1rem',        // ~16px
//       fontWeight: 600,
//       lineHeight: 1.4,
//     },
//     subtitle1: {
//       fontSize: '1rem',
//       fontWeight: 500,
//       lineHeight: 1.5,
//     },
//     subtitle2: {
//       fontSize: '0.875rem',    // ~14px
//       fontWeight: 500,
//       lineHeight: 1.5,
//     },
//     body1: {
//       fontSize: '0.875rem',    // ~14px
//       fontWeight: 400,
//       lineHeight: 1.6,
//     },
//     body2: {
//       fontSize: '0.8125rem',   // ~13px
//       fontWeight: 400,
//       lineHeight: 1.6,
//     },
//     caption: {
//       fontSize: '0.75rem',     // ~12px
//       fontWeight: 400,
//       lineHeight: 1.5,
//     },
//     overline: {
//       fontSize: '0.6875rem',   // ~11px
//       fontWeight: 600,
//       letterSpacing: '0.08em',
//       textTransform: 'uppercase',
//       lineHeight: 1.5,
//     },
//     button: {
//       fontSize: '0.9375rem',   // ~15px
//       fontWeight: 600,
//       textTransform: 'none',   // Droppers NO usa uppercase en botones
//       lineHeight: 1.5,
//     },
//   },

//   shape: {
//     borderRadius: 8,
//   },

//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 40,
//           paddingTop: 12,
//           paddingBottom: 12,
//           paddingLeft: 28,
//           paddingRight: 28,
//           boxShadow: 'none',
//           '&:hover': {
//             boxShadow: 'none',
//           },
//           '&.MuiButton-containedPrimary:hover': {
//             backgroundColor: '#C44010',
//           },
//           '&.MuiButton-outlinedPrimary': {
//             borderWidth: '1.5px',
//             '&:hover': {
//               borderWidth: '1.5px',
//             },
//           },
//         },
//       },
//     },

//     MuiTextField: {
//       defaultProps: {
//         variant: 'outlined',
//         size: 'small',
//       },
//       styleOverrides: {
//         root: {
//           '& .MuiOutlinedInput-root': {
//             borderRadius: 8,
//             '& fieldset': {
//               borderColor: '#E0E0E0',
//             },
//             '&:hover fieldset': {
//               borderColor: '#BDBDBD',
//             },
//           },
//         },
//       },
//     },

//     MuiOutlinedInput: {
//       styleOverrides: {
//         root: {
//           borderRadius: 8,
//           '& fieldset': {
//             borderColor: '#E0E0E0',
//           },
//         },
//       },
//     },

//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: 14,
//           boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
//         },
//       },
//     },

//     MuiChip: {
//       styleOverrides: {
//         root: {
//           borderRadius: 20,
//           fontWeight: 500,
//         },
//       },
//     },

//     MuiCssBaseline: {
//       styleOverrides: {
//         body: {
//           backgroundColor: '#FFFFFF',
//           color: '#1A1A1A',
//         },
//       },
//     },
//   },
// });

// export default theme;


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
      fontSize: '2.25rem',     // ~36px
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '1.75rem',     // ~28px
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '-0.005em',
    },
    h3: {
      fontSize: '1.5rem',      // ~24px
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.25rem',     // ~20px
      fontWeight: 600,
      lineHeight: 1.35,
    },
    h5: {
      fontSize: '1.125rem',    // ~18px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',        // ~16px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',    // ~14px
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '0.875rem',    // ~14px
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.8125rem',   // ~13px
      fontWeight: 400,
      lineHeight: 1.6,
    },
    caption: {
      fontSize: '0.75rem',     // ~12px
      fontWeight: 400,
      lineHeight: 1.5,
    },
    overline: {
      fontSize: '0.6875rem',   // ~11px
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      lineHeight: 1.5,
    },
    button: {
      fontSize: '0.9375rem',   // ~15px
      fontWeight: 600,
      textTransform: 'none',   // Droppers NO usa uppercase en botones
      lineHeight: 1.5,
    },
  },


  shape: {
    borderRadius: 8,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 40,
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 28,
          paddingRight: 28,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
          '&.MuiButton-containedPrimary:hover': {
            backgroundColor: colors.brand.orangeDark,
          },
          '&.MuiButton-outlinedPrimary': {
            borderWidth: '1.5px',
            '&:hover': {
              borderWidth: '1.5px',
            },
          },
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