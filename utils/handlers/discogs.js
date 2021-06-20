const { DomHandler } = require("domhandler");
const { insertAllAsync } = require("../../controller/databases.js");

function genresParser(dom) {
  let result = [];
  const body = dom
    .find((o) => o.name == "html")
    .children.find((o) => o.name == "body");
  const wrapper = body.children
    .find((o) => o.name == "div" && o.attribs && o.attribs.id == "background")
    .children.find(
      (o) => o.name == "div" && o.attribs && o.attribs.id == "page"
    )
    .children.find(
      (o) => o.name == "div" && o.attribs && o.attribs.class == "wrap"
    )
    .children.find(
      (o) =>
        o.name == "div" &&
        o.attribs &&
        o.attribs.class == "gsl-content-container"
    )
    .children.find(
      (o) => o.name == "div" && o.attribs && o.attribs.id == "shop-list"
    )
    .children.find(
      (o) => o.name == "div" && o.attribs && o.attribs.class == "gsl-content"
    )
    .children.filter(
      (o) => o.name == "ul" && o.attribs && o.attribs.class == "gsl-list"
    );

  const tab = wrapper.map((list) => {
    return list.children
      .map((el) => {
        if (el.children)
          return {
            genre: el.children[0].children[0].children[0].data,
            origin: "discogs",
          };
      })
      .filter((el) => el);
  });

  for (let sub of tab) {
    result = result.concat(sub);
  }

    console.log(result);
  return result;
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
