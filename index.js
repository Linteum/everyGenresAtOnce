const eNoise = require("./utils/handlers/eNoise")
const bandcamp = require('./utils/handlers/bancamp');
const scrap = require("./utils/scrap");

const uris = {
  eNoise:"https://everynoise.com/",
  bandcamp:"https://bandcamp.com/tags"
}
const main = async () => {
  // scrap.write(eNoise.handler, uris.eNoise)
  
  scrap.write(bandcamp.handler, uris.bandcamp)
};

main();
