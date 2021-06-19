const { DomHandler } = require("domhandler");
const { insertAllAsync } = require("../../controller/databases.js");

function genresParser(dom) {
  const body = dom
    .find((o) => o.name == "html")
    .children.find((o) => o.name == "body"); //.children.find((o) => o.name == "body");

  const wrapper = body.children
    .find(
      (o) => o.name == "div" && o.attribs && o.attribs.id == "centerWrapper"
    )
    .children.find(
      (o) => o.name == "div" && o.attribs && o.attribs.id == "propOpenWrapper"
    )
    .children.find(
      (o) => o.name == "div" && o.attribs && o.attribs.id == "pgBd"
    )
    .children.find(
      (o) => o.name == "div" && o.attribs && o.attribs.id == "content"
    )
    .children.find(
      (o) => o.name == "div" && o.attribs && o.attribs.id == "tags_cloud"
    )
    .children.filter((o) => o.name == "a");

  const tab = wrapper.map((o) => {
    if (o.children[0]) return { genre: o.children[0].data, origin: "bandcamp" };
  });

  // .map((o) => o.children[0])
  // .map((o) => o);
  console.log(tab);
  // .map((o) => {
  //   return { genre: o.children[0].data, origin: "bandcamp" };
  // });

  return tab;
}

function placesParser(dom) {
  const body = dom
    .find((o) => o.name == "html")
    .children.find((o) => o.name == "body"); //.children.find((o) => o.name == "body");

  const wrapper = body.children
    .find(
      (o) => o.name == "div" && o.attribs && o.attribs.id == "centerWrapper"
    )
    .children.find(
      (o) => o.name == "div" && o.attribs && o.attribs.id == "propOpenWrapper"
    )
    .children.find(
      (o) => o.name == "div" && o.attribs && o.attribs.id == "pgBd"
    )
    .children.find(
      (o) => o.name == "div" && o.attribs && o.attribs.id == "content"
    )
    .children.find(
      (o) => o.name == "div" && o.attribs && o.attribs.id == "locations_cloud"
    )
    .children.filter((o) => o.name == "a");

  const tab = wrapper.map((o) => {
    if (o.children[0])
      return { place: o.children[0].data, origin: "bandcamp" };
  });

  console.log(tab);

  return tab;
}

const handler = new DomHandler(async (err, dom) => {
  if (err) return err;

  const genres = genresParser(dom);
  const places = placesParser(dom);
  await insertAllAsync("genres", genres);
  await insertAllAsync("places", places);
  // this is my default function you
  // can replace it with whatever you want
});

module.exports = {
  handler,
};
