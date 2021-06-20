
const fetch = require("node-fetch");


async function main() {
  const res = await fetch("https://everynoise.com/");
  if (!res.ok) return console.error();
  const data = await res.text();
  ;

  ;

  console.log();
}

main();
