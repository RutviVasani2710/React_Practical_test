import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    light: {
      primary: '#4287f5',
      header: {
        bgColor: "#f8fafd",
        fontColor: {
          default: "#1d2433",
        }
      },
      table: {
        iconColor: "#1A202C",
        iconBG: "#EDF2F7",
      }
    },
    dark: {
      primary: '#61dafb',
      header: {
        bgColor: "#11141b",
        fontColor: {
          default: "#fff",
        }
      },
      table: {
        iconColor: "rgba(255, 255, 255, 0.92)",
        iconBG: "rgba(255, 255, 255, 0.08)",
      }
    },
  },
});

export default customTheme;
