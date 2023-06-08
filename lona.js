let Main = require("./src/Hanyaku/Main");

process.stdout.write('\033c');

let config = require("./config");

let luna = new Main(config);

console.log("\
[Note] LonaDB is still in the beta.\n\
[Note] Older beta versions can be found on https://github.com/Hanyaku/\n\
[Note] V1: ShinoaDB\n\
[Note] V2: AnbuDB\n\
[Note] V3: LonaDB <3\
");

luna.start();
