const fetch = require("node-fetch");
const { Parser } = require("htmlparser2");
const { DomHandler } = require("domhandler");

const addItem = require("./controller/genres");

// format html page stringform to object array of music genres
const fromPageToObjArray = (dom) => {
  const body = dom[0].children.find((o) => o.name == "body");
  const canvas = body.children.find(
    (o) => o.name == "div" && o.attribs && o.attribs.class == "canvas"
  );
  const tab = canvas.children
    .filter((o) => o.children)
    .map((o) => {
      return { genre: o.children[0].data };
    });
  return tab;
};

async function insertAllAsync (items) {
  await Promise.all(
    items.map((o) => {
      addItem(o);
    })
  );
}
// convert string dom to json
const handler = new DomHandler(async (err, dom) => {
  if (err) return console.error(err);

  const genres = fromPageToObjArray(dom);
  
  await insertAllAsync(genres) // this is my default function you 
  // can replace it with whatever you want

});
const parser = new Parser(handler);

const main = async () => {
  const res = await fetch("https://everynoise.com/");
  const data = await res.text();

  parser.write(data);
  parser.end();
};

main();
