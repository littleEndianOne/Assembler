//Used to track lable names and forward references.
export class asmSymbolTable {

    _lables: ILable;
    _forwardReferences: IForwardReference[];
    _lableCount: number;

    constructor() {
        this._lables = {};
        this._forwardReferences = [];
        this._lableCount = 0;
    }

    /**
    * Add a symbol and its byte code address to the symbol table.
    * @param lable The name of the lable
    * @param lableAddress the bytecode address of the lable.
    * @returns true if added; false if lable already in table.
    */
    public define(lable: string, lableAddress: number): boolean {

        //Check that the lable is not already defined
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

    /**
    * Gets the bytecode address of a name from the symbol table.
    * If the Symbol name does not exists in the table a forward reference is added with the passed pc value of the reference.
    * @param lable The name of the lable to resolve
    * @param refAddress the bytecode address of the reference (for forward lookup).
    * @returns the address of the resolved lable or null if not yet defined.
    */
    public resolve(name: string, refFromAddress: number): number | null {

        let address = this._lables[name];

        if (address != null) {
            return address;
        }
        else {
            //Add the reference to the forward references array.
            this._forwardReferences[this._forwardReferences.length] = { name, refFromAddress };
            return null;
        }

        return null;
    }

    /**
    * Resolves the internal list of forward references with the list of lables. Returns a list of resolved references and a list of unresolved references.
    * @returns object contatinng a list of resovled forward references & a list of unresolved forward references.
    */
    public resolveForwardReferences(): IForwardRefResolution {
        let resolvedReferences: IResolvedReference[] = [];
        let resolvedCount: number = 0;
        let unresolved: IForwardReference[] = [];
        let unresolvedCount: number = 0;
        let results: IForwardRefResolution = { resolved: null, unresolved: null };

        //Resolve all forward references
        this._forwardReferences.forEach(function (value, index, array) {

            let lableAddress = this.resolve(value.name);

            if (lableAddress != null) {
                resolvedReferences[resolvedCount++] = { name: value.name, refFromAddress: value.refFromAddress, lableAddress: lableAddress };
                //lookup the lable definition
            }
            else {
                //Add to the unresolved list...
                unresolved[unresolvedCount++] = value;
            }
        }, this);

        results.resolved = resolvedReferences;
        results.unresolved = unresolved;
        return results;
    }
}

//Code memory address lable
export interface ILable {
    [index: string]: number; //Location of lable in machine code
}

//A froward reference. The name refernced and the code memory location of the reference.
export interface IForwardReference {
    name: string,
    refFromAddress: number; //Location of refrence to lable in machine code.
}

//A reolved forward reference. It contains the lable name, the code addresses of the lable and the code address of the reference.
export interface IResolvedReference {
    name: string,
    refFromAddress: number; //Location of refrence to lable in machine code.
    lableAddress: number; //Location of lable in machine code
}

//Used to store the results of a call to resolveForwardReferences(). 
//It contains the resolved forward references and the remaining unresolved forward references.
export interface IForwardRefResolution {
    resolved: IResolvedReference[];
    unresolved: IForwardReference[];
}