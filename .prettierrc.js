module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  overrides: [
    {
      files: ['*.json5'],
      options: {
        singleQuote: false,
        quoteProps: 'preserve'
      }
    },
    {
      files: ['*.yml'],
      options: {
        singleQuote: false
      }
    }
  ]
};
