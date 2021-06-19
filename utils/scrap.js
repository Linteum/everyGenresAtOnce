const fetch = require("node-fetch");
const { Parser } = require("htmlparser2");

async function fetchPageFrom(uri) {
  try {
    const res = await fetch(uri);
    if (res.ok) return await res.text();

    return console.error();
  } catch (e) {
    console.error(e);
  }
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
};
