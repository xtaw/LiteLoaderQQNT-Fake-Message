import { Contact } from '../index.js';

class Friend extends Contact {

    #uid;

    static getChatType() { 
        return 1;
    }

    static fromUin(uin) {
        const uid = euphonyNative.convertUinToUid(uin);
        if (!uid) {
            return null;
        }
        return new Friend(uin, uid);
    }

    static fromUid(uid) {
        const uin = euphonyNative.convertUidToUin(uid);
        if (!uin) {
            return null;
        }
        return new Friend(uin, uid);
    }

    constructor(uin, uid) {
        super(String(uin));
        this.#uid = uid;
    }

    getUid() {
        return this.#uid;
    }

    toPeer() {
        return {
            chatType: Friend.getChatType(),
            peerUid: this.#uid,
            guildId: ''
        };
    }

}

export default Friend