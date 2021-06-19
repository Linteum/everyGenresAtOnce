const { DomHandler } = require("domhandler");
const { insertAllAsync } = require("../../controller/databases.js");

function genresParser(dom) {
  const body = dom[0].children.find((o) => o.name == "body");
  const canvas = body.children.find(
    (o) => o.name == "div" && o.attribs && o.attribs.class == "canvas"
  );
  const tab = canvas.children
    .filter((o) => o.children)
    .map((o) => {
      return { genre: o.children[0].data, origin: "everyNoiseAtOnce" };
    });
  return tab;
}

const handler = new DomHandler(async (err, dom) => {
  if (err) return err;

  const genres = genresParser(dom);
  await insertAllAsync("genres", genres);
  // this is my default function you
  // can replace it with whatever you want
});

module.exports = {
  handler,
};
