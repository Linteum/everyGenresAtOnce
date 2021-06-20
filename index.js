const eNoise = require("./utils/handlers/eNoise")
const bandcamp = require('./utils/handlers/bandcamp');
const discogs = require('./utils/handlers/discogs')
const scrap = require("./utils/scrap");

const uris = {
  eNoise:"https://everynoise.com/",
  bandcamp:"https://bandcamp.com/tags",
  discogs:"https://blog.discogs.com/en/genres-and-styles/?utm_source=discogs&utm_medium=referral&utm_campaign=navigation_menu"
}
const main = async () => {
  scrap.write(eNoise.handler, uris.eNoise)
  
  scrap.write(bandcamp.handler, uris.bandcamp)

  scrap.write(discogs.handler, uris.discogs)
};

main();
