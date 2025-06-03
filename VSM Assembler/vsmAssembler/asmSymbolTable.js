"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class asmSymbolTable {
    constructor() {
        this._lables = {};
        this._forwardReferences = [];
        this._lableCount = 0;
    }
    define(lable, lableAddress) {
        if (this._lables[lable] == null) {
            this._lables[lable] = lableAddress;
            this._lableCount++;
            return true;
        }
        else {
            return false;
        }
        return null;
    }
    resolve(name, refFromAddress) {
        let address = this._lables[name];
        if (address != null) {
            return address;
        }
        else {
            this._forwardReferences[this._forwardReferences.length] = { name, refFromAddress };
            return null;
        }
        return null;
    }
    resolveForwardReferences() {
        let resolvedReferences = [];
        let resolvedCount = 0;
        let unresolved = [];
        let unresolvedCount = 0;
        let results = { resolved: null, unresolved: null };
        this._forwardReferences.forEach(function (value, index, array) {
            let lableAddress = this.resolve(value.name);
            if (lableAddress != null) {
                resolvedReferences[resolvedCount++] = { name: value.name, refFromAddress: value.refFromAddress, lableAddress: lableAddress };
            }
            else {
                unresolved[unresolvedCount++] = value;
            }
        }, this);
        results.resolved = resolvedReferences;
        results.unresolved = unresolved;
        return results;
    }
}
exports.asmSymbolTable = asmSymbolTable;
//# sourceMappingURL=asmSymbolTable.js.map