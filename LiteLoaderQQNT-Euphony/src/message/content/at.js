import { SingleMessage } from '../../index.js';

class At extends SingleMessage {

    #uin;
    #uid;

    static getElementType() {
        return 1;
    }

    static fromUin(uin) {
        const uid = euphonyNative.convertUinToUid(uin);
        if (!uid) {
            return null;
        }
        return new At(uin, uid);
    }

    static fromUid(uid) {
        const uin = euphonyNative.convertUidToUin(uid);
        if (!uin) {
            return null;
        }
        return new At(uin, uid);
    }

    constructor(uin, uid) {
        super();
        this.#uin = String(uin);
        this.#uid = uid;
    }

    getUin() {
        return this.#uin;
    }

    getUid() {
        return this.#uid;
    }

    async toElement() {
        return {
            elementId: '',
            elementType: At.getElementType(),
            textElement: {
                atType: 2,
                atUid: this.#uin,
                atNtUid: this.#uid
            }
        };
    }

}

export default At