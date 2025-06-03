import { saveAs } from 'file-saver'
import { writeFileSync } from 'fs';
import {TypeLimits} from '../../Utility';

function printBuffer(buffer: ArrayBuffer) {
    let asStr: String = "";
    let byteBuffer = new Uint8Array(buffer);
    for (let index = 0; index < buffer.byteLength; index++) {
        asStr += byteBuffer[index].toString() + "|";
    }
    console.log(asStr);
}

//f32 infinity
//let num = 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999;

// //

//let data = new Blob([bufferAsBytes], {type: "application/octet-stream"});
//saveAs(data, "myfile.abc");
writeFileSync("TestFile.hex", bufferAsBytes);
//console.log(b0 + " " + b1 + " " + b2 + " " + b3);


// //let encoded = toBytesInt32(1000000);
// let encoded = toBytesInt8(128);

// let int8Array: Uint8Array = new Uint8Array(encoded);
// //let int32Array: Uint32Array = new Uint32Array(encoded);
// //let int8Array: Uint8Array = new Uint8Array(encoded);

// let b0 = int8Array[0];
// let b1 = int8Array[1];
// let b2 = int8Array[2];
// let b3 = int8Array[3];

// console.log(b0 + " " + b1 + " " + b2 + " " + b3);