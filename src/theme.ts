import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const colors = {
  brand: '#ff3300'
}

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config, colors });

export default theme;
