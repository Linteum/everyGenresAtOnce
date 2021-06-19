const fetch = require("node-fetch");
const { Parser } = require("htmlparser2");

const addItem = require("../controller/genres");

async function fetchPageFrom(uri) {
  try {
    const res = await fetch(uri);
    if (res.ok) return await res.text();

    return console.error();
  } catch (e) {
    console.error(e);
  }
}

// format html page stringform to object array of music genres

async function insertAllAsync(items) {
  await Promise.all(
    items.map((o) => {
      addItem(o);
    })
  );
}

// convert string dom to json

async function write(handler, url) {
  const parser = new Parser(handler);
  const data = await fetchPageFrom(url);
  parser.write(data);
  parser.end();
}

module.exports = {
  write,
  insertAllAsync,
};
