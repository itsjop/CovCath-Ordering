/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {},
  variants: {},
  plugins: [],  
  separator: '_',
  corePlugins: {
    appearance: ['responsive', 'hover', 'focus'],
  },
  purge: false,

  theme: {
    zIndex: {
      '0': 0,
      '25': 25,
      '30': 30,
      '40': 40,
      '50': 50,
      '75': 75,
      '100': 100,
      'auto': 'auto',
    }
  }
}
