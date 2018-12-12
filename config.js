module.exports = {
    development: {
      port: process.env.PORT || 5000,
      saltingRounds: 10 // How many times we want to salt our crypted data.
    },
    production: {
      // port: process.env.PORT || 8080,
      port: 8080,
      saltingRounds: 10 // How many times we want to salt our crypted data.
    }
}