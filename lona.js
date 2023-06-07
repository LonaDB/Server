let Main = require("./src/Hanyaku/Main");

process.stdout.write('\033c');

console.log("\
\
_                       ______  ____  \n\
| |                     |  __ \\|  _ \\ \n\
| |    _   _ _ __   __ _| |  | | |_) |\n\
| |   | | | | '_ \\ / _` | |  | |  _ < \n\
| |___| |_| | | | | (_| | |__| | |_) |\n\
|______\\__,_|_| |_|\\__,_|_____/|____/ \n\
\n\
")

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