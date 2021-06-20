const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

async function fetchPageFrom(uri) {
  try {
    const res = await fetch(uri);
    if (!res.ok) return console.error();

    const data = await res.text();
    const dom = new JSDOM(data);
    return dom.window;
  } catch (e) {
    console.error(e);
  }
}

// convert string dom to json

module.exports = async (website) => {

  const window = await fetchPageFrom(website.uri);
  await website.handler(window)

};
