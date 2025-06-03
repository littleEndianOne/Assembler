export class TypeLimits {

    private static _int8_Max = 127;
    private static _int8_Min = -128;

    private static _int16_Max = 32767;
    private static _int16_Min = -32768

    private static _int32_Max = 2147483647;
    private static _int32_Min = -2147483648;

    private static _uint8_Max = 255;
    private static _uint16_Max = 65535;
    private static _uint32_Max = 4294967295;

    static get Int8_Max() {
        return this._int8_Max;
    }

    static get Int8_Min() {
        return this._int8_Min;
    }

    static get Int16_Max() {
        return this._int16_Max;
    }

    static get Int16_Min() {
        return this._int16_Min;
    }

    static get Int32_Max() {
        return this._int32_Max;
    }

    static get Int32_Min() {
        return this._int32_Min;
    }

    static get UInt8_Max() {
        return this._uint8_Max;
    }

    static get UInt16_Max() {
        return this._uint16_Max;
    }

    static get UInt32_Max() {
        return this._uint32_Max;
    }

}

