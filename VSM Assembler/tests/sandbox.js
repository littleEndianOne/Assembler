"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function printBuffer(buffer) {
    let asStr = "";
    let byteBuffer = new Uint8Array(buffer);
    for (let index = 0; index < buffer.byteLength; index++) {
        asStr += byteBuffer[index].toString() + "|";
    }
    console.log(asStr);
}
fs_1.writeFileSync("TestFile.hex", bufferAsBytes);
//# sourceMappingURL=sandbox.js.map