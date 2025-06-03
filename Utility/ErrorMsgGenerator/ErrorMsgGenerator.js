"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class ErrorMsgGenerator {
    constructor(errorMsgs) {
        this.errorMsgs = errorMsgs;
    }
    replaceTags(msg, fillers) {
        let re = /({(\w+)?})/g;
        let count = 0;
        let filledMsg = msg.replace(re, (m) => {
            let fillStr = fillers[count++];
            if (fillStr != undefined) {
                return "{" + fillStr + "}";
            }
            else {
                return m;
            }
        });
        return filledMsg;
    }
    getMsg(errorCode, ...fillers) {
        let msg = this.errorMsgs[errorCode];
        if (msg == undefined) {
            msg = "Unknown Error";
        }
        else {
            msg = this.replaceTags(msg, fillers);
        }
        return msg;
    }
}
exports.ErrorMsgGenerator = ErrorMsgGenerator;
//# sourceMappingURL=ErrorMsgGenerator.js.map