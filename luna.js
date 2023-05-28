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

let port = 2000;

let luna = new Main(port);

console.log("\
[Note] LunaDB is still in the beta.\n\
[Note] Older beta versions can be found on https://github.com/Hanyaku/\n\
[Note] V1: ShinoaDB\n\
[Note] V2: AnbuDB\n\
[Note] V3: LunaDB <3\
");

luna.start();