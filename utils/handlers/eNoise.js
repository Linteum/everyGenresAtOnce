const { DomHandler } = require("domhandler");
const { insertAllAsync } = require("../scrap");

function eNoiseParse(dom) {
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
}

const handler = new DomHandler(async (err, dom) => {
  if (err) return err;

  const genres = eNoiseParse(dom);
  await insertAllAsync(genres);
  // this is my default function you
  // can replace it with whatever you want
});

module.exports = {
  handler,
};
