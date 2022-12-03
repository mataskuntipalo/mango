import { createTheme, Theme, alpha } from '@material-ui/core/styles';
import DBHeaventNormal from './fonts/DB-Heavent.ttf';
import DBHeaventLight from './fonts/DB-Heavent-Li.ttf';
import DBHeaventBold from './fonts/DB-Heavent-Med.ttf';
import { CSSProperties } from '@material-ui/styles';

const DBHeaven: CSSProperties = {
  fontFamily: 'DBHeaven',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 'normal',
  src: `
    local('DBHeaven'),
    local('DB-Heavent'),
    url(${DBHeaventNormal}) format('truetype')
  `,
};

const DBHeavenBold: CSSProperties = {
  fontFamily: 'DBHeavenBold',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 'bold',
  src: `
    local('DBHeavenBold'),
    local('DB-Heavent-Med'),
    url(${DBHeaventBold}) format('truetype')
  `,
};

const DBHeavenLight: CSSProperties = {
  fontFamily: 'DBHeavenLight',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 'lighter',
  src: `
    local('DBHeavenLight'),
    local('DB-Heavent-Li'),
    url(${DBHeaventLight}) format('truetype')
  `,
};

export default function createMyTheme(): Theme {
  return createTheme({
    typography: {
      fontFamily: 'DBHeaven',
      h1: {
        fontSize: 32,
        color: '#4F4F4F',
        textAlign: 'center',
        fontFamily: 'DBHeaven !important',
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 400,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [DBHeaven, DBHeavenBold, DBHeavenLight],
          body: {
            backgroundColor: '#ffffff',
          },
        },
      },
      MuiFormHelperText: {
        root: {
          fontSize: 12,
          color: '#C02715 !important',
          fontFamily: 'Helvetica, Arial, sans-serif;',
        },
      },
      MuiOutlinedInput: {
        root: {
          '&$focused $notchedOutline': {
            borderColor: '#BDBDBD',
            borderWidth: 1,
          },
          '&$error $notchedOutline': {
            borderColor: '#BDBDBD',
            borderWidth: 1,
          },
          '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
            borderColor: '#BDBDBD',
            borderWidth: 1,
          },
        },
      },
      MuiTypography: {
        root: {
          fontFamily: 'Helvetica, Arial, sans-serif!important;',
        },
      },
      MuiRadio: {
        root: {
          padding: '9px 16px 9px 10px',
        },
      },
      MuiButton: {
        root: {
          textTransform: 'unset',
        },
      },
      MuiCheckbox: {
        colorSecondary: {
          '&$checked': {
            color: '#6F31CC',
          },
          '&$disabled': {
            color: '#828282',
          },
        },
      },
    },
    palette: {
      primary: {
        main: '#6F31CC',
      },
    },
  });
}
