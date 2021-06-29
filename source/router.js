const { getItems } = require("../controller/databases");

function retLittleArray(items, key) {
  if (items.length > 10) return items.map((item) => item[key]).slice(0, 10);
  return items.map((item) => item[key]);
}

module.exports = async function (fastify, options) {
  fastify.get("/", async (req, rep) => {
    rep.send({msg:"root dir"});
  });
  fastify.get("/tags", async (req, rep) => {
    

    const params = req.query;
    const result = {};
    if (params) {
      if (params.genres) {
        const items = await getItems("genres", params.genres);
        const genres = retLittleArray(items, "genre");
        result.genres = genres;
      }
      if (params.places) {
        const items = await getItems("places", params.places);
        const places = retLittleArray(items, "place");
        result.places = places;
      }
      console.log("good route /api")
      rep.code(200).type("application/json").send(result);
    } else {
      rep
        .code(501)
        .type("application/json")
        .send({ error: "no parameters passed" });
    }
  });
};
