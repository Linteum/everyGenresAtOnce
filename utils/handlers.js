const { insertAllAsync } = require("../controller/databases.js");

const eNoise = {
  uri: "https://everynoise.com/",
  handler: async function (window) {
    const elmts = window.document.getElementsByClassName("scanMe");

    const items = Object.values(elmts).map((el) => {
      const value = el.textContent.split("»").join("").trim();
      return { genre: value, origin: "everyNoiseAtOnce" };
    });

    console.log(items);
    await insertAllAsync("genres", items);
  },
};

const bandcamp = {
  uri: "https://bandcamp.com/tags",
  handler: async function (window) {
    const tagElmts = window.document
      .getElementById("tags_cloud")
      .getElementsByClassName("tag");

    const tagItems = Object.values(tagElmts).map((el) => {
      const value = el.textContent.trim();
      return { genre: value, origin: "bandcamp" };
    });

    const placesElmts = window.document
      .getElementById("locations_cloud")
      .getElementsByClassName("tag");

    const placesItems = Object.values(placesElmts).map((el) => {
      const value = el.textContent.trim();
      return { place: value, origin: "bandcamp" };
    });

    await insertAllAsync("genres", tagItems);
    await insertAllAsync("places", placesItems);
  },
};

const discogs = {
  uri: "https://blog.discogs.com/en/genres-and-styles/?utm_source=discogs&utm_medium=referral&utm_campaign=navigation_menu",
  handler: async function (window) {
    const listsElmts = window.document.getElementsByClassName("gsl-list");

    const items = Object.values(listsElmts)
      .map((list) => {
        const listElmts = list.getElementsByClassName("gsl-artist");
        return Object.values(listElmts).map((el) => {
          const value = el.textContent.trim();
          return { genre: value, origin: "discogs" };
        });
      })
      .reduce((acc, val) => acc.concat(val, []));

      await insertAllAsync("genres", items);
  },
};

module.exports = {
  eNoise,
  bandcamp,
  discogs,
};
