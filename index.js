const {eNoise, discogs, bandcamp} = require('./utils/handlers.js')
const scrap = require("./utils/scrap");

const main = async () => {

  scrap(eNoise)
  scrap(discogs)
  scrap(bandcamp)

};

main();
