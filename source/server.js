const path = require("path");
require("dotenv").config();

const pageUrl = "127.0.0.1:3000"
const pageUrlreg = new RegExp(pageUrl)
// const fastifyStatic = require('fastify-static');

const server = () => {
  const fastify = require("fastify")({
    logger: true,
  });

  // register

  fastify.register(require("./router"));

  fastify.register(
    require("fastify-cors"),
    (instance) => (req, callback) => {
        let options 
        cosnt 
        if (pageUrlreg.test("http://127.0.0.1:3000/")) {
            options = {origin : true}
        }

        callback(null, options)
    }
  );
  fastify.setNotFoundHandler((req, rep) => {
    rep.send({ error: 404 });
  });

  fastify.listen(process.env.PORT, (err, address) => {
    if (err) {
      fastify.log.error("toto : ", err);
      process.exit(1);
    }

    fastify.log.info(`server listening on ${address}`);
  });
};

server();
