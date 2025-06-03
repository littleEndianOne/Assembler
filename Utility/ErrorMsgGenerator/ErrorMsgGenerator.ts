export interface IError {
    [index: number] : string;
};

export class ErrorMsgGenerator<K extends keyof IError> {

    errorMsgs: IError;

    constructor(errorMsgs: IError)
    {
        this.errorMsgs = errorMsgs
    }

    private replaceTags(msg: string, fillers: string[]) {

        let re = /({(\w+)?})/g;
        
            let count = 0;
            let filledMsg =  msg.replace(re, (m) => {
                let fillStr = fillers[count++];
                if (fillStr != undefined) { 
                    return "{" + fillStr + "}";
                }
                else {
                    return m;
                }                
            })            
            //let filledMsg = msg.replace(re, "{" + fillers[0] + "}");
        return filledMsg;
    }

    public getMsg(errorCode: K, ...fillers: string[]) {
        //Lookup error string
        let msg = this.errorMsgs[errorCode];

        if (msg == undefined) {
            msg = "Unknown Error";
        }
        else {
                //replace tags with info
        msg = this.replaceTags(msg, fillers);

        }

        return msg;
    }
}